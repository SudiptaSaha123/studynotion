import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../redux/slices/cartSlice";
import Rating from "./Rating";

const RanderCartCourse = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-8">
      {cart.map((item, i) => (
        <div className="flex flex-col lg:flex-row gap-5">
          <img
            src={item.thumbnail}
            alt={item.courseName}
            className="w-full sm:w-[250px] h-[170px] object-cover rounded-xl"
          ></img>

          <div className="flex flex-col gap-2">
            <p className=" text-lg font-semibold">{item.courseName}</p>
            <p className="text-sm font-normal text-richblack-200">
              {item.category?.name}
            </p>
            <p className=" text-richblack-100">
              By {item.instructor.firstName} {item.instructor.lastName}
            </p>
            <div className="flex items-center gap-2 text-[17px] text-yellow-50">
              <Rating rating={item.ratingAndReviews}></Rating>
              <ReactStars
                count={5}
                value={item.ratingAndReviews.length}
                edit={false}
                emptyIcon={<FaStar></FaStar>}
                filledIcon={<FaStar></FaStar>}
                activeColor="#FFE83D"
                size={20}
              ></ReactStars>
            </div>
            <div className="flex gap-5 items-center">
              <p className="text-lg text-yellow-50">₹ {item.price}</p>
              <button
                className="flex items-center gap-2 text-pink-200 bg-pink-900 py-2 px-4 rounded-md"
                onClick={() => dispatch(removeFromCart(item?._id))}
              >
                <p>Remove</p>
                <RiDeleteBin6Line></RiDeleteBin6Line>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RanderCartCourse;
