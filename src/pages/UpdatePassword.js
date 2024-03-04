import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(newPassword, confirmNewPassword, token));
    setNewPassword("");
    setConfirmNewPassword("");
  };
  return (
    <div className="text-white w-full h-screen flex items-center justify-between">
      <div className="w-[90%] sm:w-[70%] md:w-[35%] mx-auto">
        <h2 className="text-4xl font-semibold mb-3">Choose new password</h2>
        <p className="text-richblack-300 mb-3 text-sm">
          Almost done. Enter your new password and youre all set.
        </p>
        <form onSubmit={handleOnSubmit} className="w-full flex flex-col gap-3">
          <label className=" relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create New Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showNewPassword ? "text" : "password"}
              name="password"
              value={newPassword}
              placeholder="Create password"
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            ></input>
            <span
              className=" absolute right-3 top-[38px] cursor-pointer text-richblack-200"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24}></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye fontSize={24}></AiOutlineEye>
              )}
            </span>
          </label>

          <label className=" relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmNewPassword ? "text" : "password"}
              name="password"
              value={confirmNewPassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            ></input>
            <span
              className=" absolute right-3 top-[38px] cursor-pointer text-richblack-200"
              onClick={() => setShowConfirmNewPassword((prev) => !prev)}
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24}></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye fontSize={24}></AiOutlineEye>
              )}
            </span>
          </label>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Reset Password
          </button>
        </form>
        <Link className="flex items-center gap-2 mt-3" to="/login">
          <FaArrowLeft></FaArrowLeft>
          <p>Back to login</p>
        </Link>
      </div>
    </div>
  );
};

export default UpdatePassword;
