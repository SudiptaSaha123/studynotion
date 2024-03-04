import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAbutton from "./CTAbutton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-9 sm:gap-0 justify-between items-center">
      <div className="w-full sm:w-[40%] shadow-[12px_12px_0_0] shadow-richblack-5">
        <img src={Instructor} alt=""></img>
      </div>
      <div className=" w-full sm:w-[40%] flex flex-col gap-4 items-start">
        <div className=" text-4xl font-semibold">
          <p>Become an</p>
          <p className=" text-[#98E4FF]">instructor</p>
        </div>
        <p className=" text-richblack-300 text-sm font-bold">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className=" mt-8">
          <CTAbutton active={true} linkto={"/signup"}>
            <div className="flex items-center justify-center gap-3">
              Start Teaching Today
              <FaArrowRight></FaArrowRight>
            </div>
          </CTAbutton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
