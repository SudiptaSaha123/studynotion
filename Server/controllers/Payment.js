const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
require("dotenv").config();

const enrolledStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Courses and userId",
    });
  }

  for (const courseId of courses) {
    try {
      // Find the course and anroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course Not Found",
        });
      }

      console.log("Updated Course: ", enrolledCourse);

      // Initiate course Progress
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      // Find the student and add the course to thair listof enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: { courses: courseId, courseProgress: courseProgress._id },
        },
        { new: true }
      );

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled Into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Email response: ", emailResponse);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// Capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;

  const userId = req.user.id;

  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "Please Provide course Id",
    });
  }

  // Calcutate Total amount
  let total_amount = 0;
  for (const course_id of courses) {
    let course;
    try {
      // Find the course by id
      course = await Course.findById(course_id);

      // If the course is not found
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could not find the course",
        });
      }

      // Check if the student already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }

      // Add the price of the course in total amount
      total_amount = total_amount + course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    // Initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);

    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could Not initiate order",
    });
  }
};

// Verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await enrolledStudents(courses, userId, res);

    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }

  return res.status(200).json({
    success: false,
    message: "Payment Failed",
  });
};

// Send Payment successfull email
exports.sendPaymentSuccessfullEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const { userId } = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide all The Details",
    });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("Error In sending mail: ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Free enrollments of students
exports.studentFreeEnollment = async (req, res) => {
  const courses = req.body?.courses;
  const userId = req.user.id;

  await enrolledStudents(courses, userId, res);
};
