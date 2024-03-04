import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, signUp } from "../services/operations/authAPI";
import { FaClockRotateLeft } from "react-icons/fa6";

const VarifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const { signupData } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="text-white w-full h-screen flex items-center justify-between">
      <div className="w-[90%] sm:w-[70%] md:w-[35%] mx-auto">
        <h2 className="text-4xl font-semibold mb-3">Verify email</h2>
        <p className="text-richblack-300 mb-3 text-sm">
          A verification code has been sent to you. Enter the code below
        </p>
        <form className="w-full flex flex-col gap-3" onSubmit={handleOnSubmit}>
          <div className="w-full flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={
                <span className=" text-richblack-200 px-1">-</span>
              }
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="otpInput bg-richblack-800"
                />
              )}
            ></OTPInput>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Verify and Register
          </button>
        </form>

        <div className="w-full flex items-center justify-between">
          <div>
            <Link className="flex items-center gap-2 mt-3" to="/login">
              <FaArrowLeft></FaArrowLeft>
              <p>Back to login</p>
            </Link>
          </div>

          <button
            onClick={() => dispatch(sendOTP(signupData.email, navigate))}
            className="flex items-center gap-2 text-blue-100"
          >
            <FaClockRotateLeft></FaClockRotateLeft>
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VarifyEmail;
