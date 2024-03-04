import React from "react";
import { HiUser } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`flex flex-col w-full lg:w-[360px] cursor-pointer justify-between h-[300px] ${
        currentCard === cardData.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className=" py-7 px-6 flex flex-col gap-3">
        <div
          className={`text-xl font-bold ${
            currentCard === cardData.heading
              ? "text-richblack-700"
              : "text-richblack-25"
          }`}
        >
          {cardData.heading}
        </div>
        <div className="text-lg text-richblack-300">{cardData.description}</div>
      </div>

      <div
        className={`flex border-t border-richblack-400 items-center justify-between py-4 px-8 ${
          currentCard === cardData.heading
            ? "text-blue-300"
            : "text-richblack-300"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <HiUser></HiUser>
          {cardData.level}
        </div>
        <div className="flex items-center justify-center gap-2">
          <ImTree></ImTree>
          {cardData.lessionNumber}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
