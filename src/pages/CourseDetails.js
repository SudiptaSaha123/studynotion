import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import getAvgRating from "../utils/avgRating";
import RatingStars from "../components/common/RatingStars";
import CourseDetailsCard from "../components/core/course/CourseDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import ConfrimationModal from "../components/common/ConfrimationModal";
import {
  BuyCourse,
  freeEnrollStudent,
} from "../services/operations/studentsFeaturesAPI";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { formateDate } from "../services/formateDate";
import CourseAccordionBar from "../components/core/course/CourseAccordionBar";
import Footer from "../components/common/Footer";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import { addToCart } from "../redux/slices/cartSlice";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confrimationModal, setComfrimationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      const result = await fetchCourseDetails(courseId);
      setResponse(result);
      setLoading(false);
    };

    if (courseId) {
      getCourseDetails();
    }
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    if (response) {
      const count = getAvgRating(response.courseDetails?.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [response]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    if (response) {
      let lectures = 0;
      response.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0;
      });

      setTotalNoOfLectures(lectures);
    }
  }, [response]);

  const [isActive, setIsActive] = useState(Array(0));

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const handleBuyCourse = async () => {
    if (token) {
      if (response.courseDetails?.price === 0) {
        await freeEnrollStudent(token, [courseId], navigate);
        return;
      }
      await BuyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setComfrimationModal({
      text1: "You Are Not Logged In!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setComfrimationModal(null),
    });
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors can't buy a course");
    }

    if (token) {
      dispatch(addToCart);
      return;
    }

    setComfrimationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setComfrimationModal(null),
    });
  };

  if (loading || !response) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className=" w-full">
        <div className="w-full bg-richblack-700 pt-20">
          <div className="w-11/12 max-w-maxContent mx-auto py-10 flex flex-col gap-5">
            <div className="w-full relative">
              <div className="w-full lg:w-[60%] flex flex-col gap-4">
                <img
                  src={response.courseDetails?.thumbnail}
                  alt={response.courseDetails?.courseName}
                  className=" object-cover rounded-xl flex lg:hidden"
                ></img>
                <p className=" text-lg lg:text-4xl font-bold text-richblack-5">
                  {response.courseDetails?.courseName}
                </p>
                <p className="text-richblack-200 text-sm sm:text-base">
                  {response.courseDetails?.courseDescription}
                </p>
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-yellow-25">{avgReviewCount}</p>
                    <RatingStars
                      reviewCount={avgReviewCount}
                      starSize={24}
                    ></RatingStars>
                  </div>
                  <p className=" text-richblack-50">{`(${response.courseDetails?.ratingAndReviews.length} reviews)`}</p>
                  <p className=" text-richblack-50">{`${response.courseDetails?.ratingAndReviews.length} students enrolled`}</p>
                </div>
                <p className=" text-richblack-5">
                  Created by {response.courseDetails?.instructor.firstName}{" "}
                  {response.courseDetails?.instructor.lastName}
                </p>
                <div className="flex items-center gap-5 flex-wrap">
                  <p className="flex items-center gap-2 text-sm text-richblack-5">
                    <BiInfoCircle></BiInfoCircle> Created at{" "}
                    {formateDate(response.courseDetails?.createdAt)}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-richblack-5">
                    <HiOutlineGlobeAlt></HiOutlineGlobeAlt> English
                  </p>
                </div>
                <div className="flex items-center gap-3 lg:hidden">
                  <button
                    className="bg-yellow-50 rounded-md py-2 px-3 font-semibold"
                    onClick={
                      user &&
                      response.courseDetails.studentsEnrolled.includes(
                        user?._id
                      )
                        ? () => navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                    }
                  >
                    {user &&
                    response.courseDetails?.studentsEnrolled.includes(user?._id)
                      ? "Go To Course"
                      : response.courseDetails?.price < 1
                      ? "Free"
                      : "Buy Now"}
                  </button>

                  {!user ||
                    (!response.courseDetails?.studentsEnrolled.includes(
                      user?._id
                    ) && (
                      <button
                        type="button"
                        className="rounded-md py-2 px-3 font-semibold border border-richblack-700 bg-richblack-800 text-richblack-100"
                        onClick={handleAddToCart}
                      >
                        Add To Cart
                      </button>
                    ))}
                </div>
              </div>

              {/* Course Card  */}
              <div className="w-[370px] p-4 rounded-xl bg-richblack-800 lg:absolute hidden lg:block right-0 -top-5">
                <CourseDetailsCard
                  course={response.courseDetails}
                  handleAddToCart={handleAddToCart}
                  handleBuyCourse={handleBuyCourse}
                ></CourseDetailsCard>
              </div>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent mx-auto">
          <div className=" my-8 p-8 border border-richblack-600 w-full lg:w-[600px]">
            <p className="text-3xl font-semibold text-richblack-5">
              What you'll learn
            </p>
            <div className="text-richblack-50 mt-5">
              {response.courseDetails?.whatYouWillLearn}
            </div>
          </div>

          {/* Course content section */}
          <div className="w-full lg:max-w-[750px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold text-richblack-5">
                Course Content
              </p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2 text-richblack-5 flex-wrap">
                  <span>
                    {response.courseDetails?.courseContent.length}{" "}
                    {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className=" text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Accordion Bar */}
            <div className="py-4">
              {response.courseDetails?.courseContent.map((course, i) => (
                <CourseAccordionBar
                  key={i}
                  course={course}
                  isActive={isActive}
                  handleActive={handleActive}
                ></CourseAccordionBar>
              ))}
            </div>

            <div className=" my-8">
              <p className="text-[28px] font-semibold text-richblack-5">
                Meet Your Instructor!
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={response.courseDetails?.instructor.image}
                  alt="Instuuctor"
                  className="h-14 w-14 rounded-full object-cover"
                ></img>
                <p className=" text-lg text-richblack-5">{`${response.courseDetails?.instructor.firstName} ${response.courseDetails?.instructor.lastName}`}</p>
              </div>
              <p className=" text-richblack-50 mt-2">
                {response.courseDetails?.instructor.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>

      {confrimationModal && (
        <ConfrimationModal modalData={confrimationModal}></ConfrimationModal>
      )}
    </>
  );
};

export default CourseDetails;
