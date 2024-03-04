import React from "react";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ reviewData }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-richblack-800">
      <div className="flex items-center gap-3">
        <img
          src={reviewData.user?.image}
          alt="userImage"
          className="w-[60px] h-[60px] object-cover rounded-full"
        ></img>
        <div className="text-richblack-300">
          <p className="text-sm text-richblack-5">
            {reviewData?.user?.firstName} {reviewData?.user?.lastName}
          </p>
          <p className=" text-xs">{reviewData?.user?.email}</p>
        </div>
      </div>
      <p className=" text-richblack-200 text-sm">{reviewData?.review}</p>
      <div className="flex gap-2 items-center">
        <p className=" text-yellow-25">{reviewData?.rating}</p>
        <ReactStars
          count={5}
          value={reviewData?.rating}
          size={20}
          edit={false}
          activeColor="#ffd700"
          emptyIcon={<FaStar></FaStar>}
          fullIcon={<FaStar></FaStar>}
        ></ReactStars>
      </div>
    </div>
  );
};

export default ReviewCard;
