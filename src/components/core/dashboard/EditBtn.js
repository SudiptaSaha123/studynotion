import React from "react";
import { LuFileEdit } from "react-icons/lu";

const EditBtn = ({ onClickHandler }) => {
  return (
    <button
      className="py-2 px-3 rounded-md bg-yellow-100 flex items-center gap-2 text-sm text-richblack-900 font-medium hover:scale-95 transition-all duration-200"
      onClick={onClickHandler}
    >
      <LuFileEdit className="text-lg"></LuFileEdit>
      <p>Edit</p>
    </button>
  );
};

export default EditBtn;
