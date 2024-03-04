import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = getAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <Link to={`/courses/${course._id}`}>
      <div>
        <div className="rounded-lg">
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            className={`${Height} w-full rounded-xl object-cover`}
          ></img>
        </div>
        <div className="flex flex-col gap-2 px-1 py-2">
          <p className="text-xl text-richblack-5">{course?.courseName}</p>
          <p className="text-sm text-richblack-50">
            By {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex gap-2 items-center">
            <p className=" text-yellow-5">{avgReviewCount || 0}</p>
            <RatingStars reviewCount={avgReviewCount}></RatingStars>
            <p className=" text-richblack-400">
              {course?.ratingAndReviews.length} Ratings
            </p>
          </div>
          <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;
