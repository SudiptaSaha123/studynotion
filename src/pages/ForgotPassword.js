import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className=" text-white w-full h-screen flex items-center justify-between">
      <div className="w-[90%] sm:w-[70%] md:w-[35%] mx-auto">
        <h2 className=" text-4xl font-semibold mb-3">
          {!emailSent ? "Reset your password" : "Check email"}
        </h2>
        <p className=" text-richblack-300 mb-3 text-sm">
          {!emailSent
            ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`}
        </p>

        <form onSubmit={handleOnSubmit} className=" w-full flex flex-col gap-3">
          {!emailSent && (
            <label>
              <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1">
                Email Address
              </p>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              ></input>
            </label>
          )}

          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            {!emailSent ? "Reset Password" : "Resend Email"}
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

export default ForgotPassword;
