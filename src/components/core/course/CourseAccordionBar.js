import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import SubsectionAccordionBar from "./SubsectionAccordionBar";

const CourseAccordionBar = ({ course, isActive, handleActive }) => {
  const contentE1 = useRef(null);

  // Accordian state
  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setActive(isActive.includes(course._id));
  }, [isActive]);

  useEffect(() => {
    setSectionHeight(active ? contentE1.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="border border-solid border-richblack-600 bg-richblack-700 text-richblack-5">
      <div
        className="flex items-center justify-between py-4 px-3 cursor-pointer flex-wrap"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-2 transition-[0.3s]">
          <i
            className={
              isActive.includes(course._id) ? "rotate-180" : "rotate-0"
            }
          >
            <AiOutlineDown></AiOutlineDown>
          </i>
          <p>{course.sectionName}</p>
        </div>
        <p>{`${course.subSection.length || 0} Lecture(s)`}</p>
      </div>
      <div
        className="bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease] h-0 relative overflow-hidden"
        style={{ height: sectionHeight }}
        ref={contentE1}
      >
        <div className="flex flex-col text-lg font-semibold">
          {course.subSection.map((subsec, i) => (
            <SubsectionAccordionBar
              key={i}
              subsec={subsec}
            ></SubsectionAccordionBar>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAccordionBar;
