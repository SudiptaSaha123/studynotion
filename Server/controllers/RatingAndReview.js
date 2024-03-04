const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// Create Rating controller
exports.createRating = async (req, res) => {
  try {
    // Get user id
    const userId = req.user.id;
    // Fetch data from req.body
    const { rating, review, courseId } = req.body;

    // Check user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // Check if user already reviewed the cousrse
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }

    // create rating and review
    const ratingreview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });

    // Update course with rating and review
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { ratingAndReviews: ratingreview._id } },
      { new: true }
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingreview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Avarage Rating Controller
exports.getAvarageRating = async (req, res) => {
  try {
    // Get Course id
    const courseId = req.body.courseId;

    // Calculate Avarage rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          avarageRating: { $avg: "$rating" },
        },
      },
    ]);

    //Return Rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        avarageRating: result[0].avarageRating,
      });
    }

    // If no rating/Review exists
    return res.status(200).json({
      success: true,
      message: "Avarage ratig is 0, No rating is given till now",
      avarageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all rating and review
exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
