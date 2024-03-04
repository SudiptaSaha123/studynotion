import React from "react";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAbutton from "./CTAbutton";

const LearningLanguageSection = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto mt-32 flex flex-col items-center">
      <div className="items-center justify-center flex">
        <div className="flex w-full md:w-[750px] flex-col gap-4 items-start text-start md:items-center md:text-center">
          <p className=" text-4xl font-semibold">
            Your swiss knife for{" "}
            <span className=" text-[#80d7f6]">learning any language</span>
          </p>
          <p className=" text-richblack-500 text-sm font-bold">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
        <img
          src={know_your_progress}
          alt=""
          className="object-contain lg:translate-x-40 lg:-translate-y-5 z-10"
        ></img>
        <img
          src={compare_with_others}
          alt=""
          className="object-contain z-20 lg:translate-x-8"
        ></img>
        <img
          src={plan_your_lesson}
          alt=""
          className="object-contain z-30 lg:-translate-x-28"
        ></img>
      </div>
      <div className="w-fit mt-5 mb-20">
        <CTAbutton active={true} linkto={"/signup"}>
          Learn more
        </CTAbutton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
