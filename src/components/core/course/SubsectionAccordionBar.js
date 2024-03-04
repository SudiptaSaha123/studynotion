import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";

const SubsectionAccordionBar = ({ subsec }) => {
  return (
    <div className="flex items-center gap-3 py-2 px-6 border-b border-solid border-richblack-600">
      <HiOutlineVideoCamera></HiOutlineVideoCamera>
      <p>{subsec.title}</p>
    </div>
  );
};

export default SubsectionAccordionBar;
