import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import frameImg from "../../../assets/Images/frame.png";

const Template = ({ title, description1, description2, image, formType }) => {
  return (
    <div className="w-full">
      <div className=" w-11/12 max-w-maxContent mx-auto flex items-center justify-between">
        <div className="w-full md:w-[45%]">
          <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {title}
          </h2>
          <div>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
              {description1}
            </p>
            <p className="font-edu-sa font-bold italic text-blue-100 text-[1.125rem] leading-[1.625rem]">
              {description2}
            </p>
          </div>
          {formType === "signup" ? (
            <SignupForm></SignupForm>
          ) : (
            <LoginForm></LoginForm>
          )}
        </div>
        <div className="relative w-[45%] hidden md:flex">
          <img src={frameImg} alt="" width={458} loading="lazy"></img>
          <img
            src={image}
            alt=""
            width={458}
            loading="lazy"
            className=" absolute -top-3 -left-3"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Template;
