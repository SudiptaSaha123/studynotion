import React, { useEffect } from "react";
import RanderSteps from "./RanderSteps";

const AddCourse = () => {
  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[900px] mx-auto mt-16 mb-24">
        <h1 className="text-4xl font-semibold mb-8 md:mb-0">Add Course</h1>
        <div className="flex flex-col-reverse md:flex-row items-start gap-2 justify-between">
          <RanderSteps></RanderSteps>
          <div className="max-w-[500px] md:max-w-[300px] p-6 bg-richblack-800 rounded-md xl:fixed right-14 top-28">
            <p className=" text-base mb-3">⚡Course Upload Tips</p>
            <ul className=" list-disc pl-5 text-[10px] text-richblack-300">
              <li className="mb-1">
                Set the Course Price option or make it free.
              </li>
              <li className="mb-1">
                Standard size for the course thumbnail is 1024x576.
              </li>
              <li className="mb-1">
                Video section controls the course overview video.
              </li>
              <li className="mb-1">
                Course Builder is where you create & organize a course.
              </li>
              <li className="mb-1">
                Add Topics in the Course Builder section to create lessons,
                quizzes, and assignments.
              </li>
              <li className="mb-1">
                Information from the Additional Data section shows up on the
                course single page.
              </li>
              <li className="mb-1">
                Make Announcements to notify any important
              </li>
              <li className="mb-1">Notes to all enrolled students at once.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
