import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/settingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="w-full flex flex-col items-start gap-10 p-10 bg-richblack-800 rounded-md mt-10 border border-richblack-700">
        <p className="text-xl font-semibold">Update Profile Information</p>
        <div className="flex flex-col gap-8 w-full">
          {/* 1st row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="flex flex-col w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Date Of Birth
              </p>
              <input
                type="date"
                name="dateOfBirth"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              ></input>
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </label>
            <label className="flex flex-col w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Gender
              </p>
              <select
                name="gender"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </label>
          </div>

          {/* 2nd Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="flex flex-col w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Contact Number
              </p>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Enter Contact Number"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              ></input>
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </label>

            <label className="flex flex-col w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                About
              </p>
              <input
                type="text"
                name="about"
                placeholder="Enter Bio Details"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              ></input>
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
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

export default EditProfile;
