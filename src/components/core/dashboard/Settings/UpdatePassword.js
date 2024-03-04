import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/settingsAPI";
import { useSelector } from "react-redux";

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="w-full flex flex-col gap-10 p-8 bg-richblack-800 rounded-md mt-10 border border-richblack-700">
        <p className="text-xl font-semibold">Update Password</p>
        <div className="flex flex-col items-center gap-4">
          <label className="flex flex-col w-full relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Curent Password
            </p>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter Current Password"
              {...register("oldPassword", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            ></input>
            <span
              className=" absolute right-3 top-[38px] cursor-pointer text-richblack-200"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24}></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye fontSize={24}></AiOutlineEye>
              )}
            </span>
          </label>

          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            <label className="flex flex-col w-full relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password
              </p>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter New Password"
                {...register("newPassword", { required: true })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
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
            <label className="flex flex-col w-full relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password
              </p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                {...register("confirmNewPassword", { required: true })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              ></input>
              <span
                className=" absolute right-3 top-[38px] cursor-pointer text-richblack-200"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24}></AiOutlineEyeInvisible>
                ) : (
                  <AiOutlineEye fontSize={24}></AiOutlineEye>
                )}
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
