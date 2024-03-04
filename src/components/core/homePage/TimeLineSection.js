import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";

const timeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto items-center justify-between flex flex-col md:flex-row gap-4 mt-16">
      <div className="w-full md:w-[45%]">
        <div className="flex flex-col gap-7">
          {timeLine.map((element, index) => {
            return (
              <div
                className="flex gap-5 items-center border p-5 rounded-md border-richblue-50 shadow-md shadow-blue-25"
                key={index}
              >
                <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
                  <img src={element.Logo} alt=""></img>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">{element.Heading}</p>
                  <p className="text-[12px]">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-[45%] flex flex-col items-center">
        <img
          src={timeLineImage}
          alt=""
          className="shadow-blue-50 shadow-2xl"
        ></img>
      </div>
    </div>
  );
};

export default TimeLineSection;
