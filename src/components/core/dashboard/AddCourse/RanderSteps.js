import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInfirmationForm from "./courseInformation/CourseInfirmationForm";
import CourseBuilder from "./courseBuilder/CourseBuilder";
import PublishCourse from "./publishCourse/PublishCourse";

const RanderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div className="w-full md:w-[500px] mt-8">
      <div className="w-[83%] mx-auto flex items-center justify-between">
        {steps.map((item) => (
          <>
            <div
              key={item.id}
              className={`${
                step === item.id
                  ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              } w-[40px] h-[40px] p-3 rounded-full flex items-center justify-center border mb-2 ${
                step > item.id && "bg-yellow-50 text-yellow-50"
              }`}
            >
              {step > item.id ? (
                <FaCheck className="font-bold text-richblack-900"></FaCheck>
              ) : (
                item.id
              )}
            </div>
            {item.id !== steps.length && (
              <div
                className={`h-[1px] w-[35%]  border-dashed border-t-2 ${
                  step > item.id ? "border-yellow-50" : "border-richblack-500"
                } `}
              ></div>
            )}
          </>
        ))}
      </div>

      <div className="relative flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[24%] flex-col items-center gap-y-2"
              key={item.id}
            >
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>
      <div className=" mt-10">
        {step === 1 && <CourseInfirmationForm></CourseInfirmationForm>}
        {step === 2 && <CourseBuilder></CourseBuilder>}
        {step === 3 && <PublishCourse></PublishCourse>}
      </div>
    </div>
  );
};

export default RanderSteps;
