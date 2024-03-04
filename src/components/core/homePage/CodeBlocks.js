import React from "react";
import CTAbutton from "./CTAbutton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subHeading,
  codeBlock,
  ctaButton1,
  ctaButton2,
  bgGradient,
}) => {
  return (
    <div
      className={`flex ${position} items-center justify-between my-10 gap-5 flex-col`}
    >
      <div className="w-full lg:w-[50%]">
        {heading}
        {subHeading}
        <div className="flex items-center flex-wrap gap-8 mt-11">
          <CTAbutton active={ctaButton1.active} linkto={ctaButton1.linkto}>
            <div className="flex items-center justify-center gap-3">
              <div>{ctaButton1.btnText}</div>
              <FaArrowRight></FaArrowRight>
            </div>
          </CTAbutton>
          <CTAbutton active={ctaButton2.active} linkto={ctaButton2.linkto}>
            {ctaButton2.btnText}
          </CTAbutton>
        </div>
      </div>
      <div className="w-[100%] h-fit flex lg:w-[500px] text-[12px] border p-4 border-richblack-500 relative">
        <div
          className={`${bgGradient} h-[200px] w-[350px] absolute rounded-full -left-2 -top-3 blur-md opacity-10`}
        ></div>
        <div className=" w-[5%] flex flex-col font-bold font-inter text-richblack-400">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div className="w-[95%] flex flex-col font-bold font-mono text-[#98E4FF]">
          <TypeAnimation
            sequence={[codeBlock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          ></TypeAnimation>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
