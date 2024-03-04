import React from "react";
import { useSelector } from "react-redux";
import EditBtn from "./EditBtn";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[800px] flex flex-col items-start mx-auto mt-12 mb-24">
        <h1 className="text-4xl font-semibold">My Profile</h1>

        {/* Section 1 */}
        <div className="w-full flex flex-col sm:flex-row gap-5 items-center justify-between p-10 bg-richblack-800 rounded-md mt-10 border border-richblack-700">
          <div className="flex gap-4 flex-col sm:flex-row items-center">
            <img
              src={user?.image}
              alt=""
              className=" aspect-square w-[50px] rounded-full object-cover"
            ></img>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-xl font-semibold">
                {user?.firstName + " " + user.lastName}
              </p>
              <p className="text-sm text-richblack-300">{user.email}</p>
            </div>
          </div>
          <EditBtn
            onClickHandler={() => navigate("/dashboard/settings")}
          ></EditBtn>
        </div>

        {/* Section 2 */}
        <div className="w-full p-10 bg-richblack-800 rounded-md mt-10 border border-richblack-700">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">About</p>
            <EditBtn
              onClickHandler={() => navigate("/dashboard/settings")}
            ></EditBtn>
          </div>
          <p className="text-sm text-richblack-300 mt-5">
            {user?.additionalDetails?.about
              ? user?.additionalDetails?.about
              : "Write something about yourself"}
          </p>
        </div>

        {/* Section 3 */}
        <div className="w-full p-10 bg-richblack-800 rounded-md mt-10 border border-richblack-700">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Personal Details</p>
            <EditBtn
              onClickHandler={() => navigate("/dashboard/settings")}
            ></EditBtn>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-[75%] justify-between">
              <div className="w-[50%]">
                <p className="text-sm text-richblack-400">First Name</p>
                <p className="text-sm">{user?.firstName}</p>
              </div>
              <div className="w-[50%]">
                <p className="text-sm text-richblack-400">Last Name</p>
                <p className="text-sm">{user?.lastName}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-[75%] justify-between">
              <div className="w-[50%]">
                <p className="text-sm text-richblack-400">Email</p>
                <p className="text-sm">{user?.email}</p>
              </div>
              <div className="w-[50%]">
                <p className="text-sm text-richblack-400">Phone Number</p>
                <p className="text-sm">
                  {user?.additionalDetails?.contuctNumber
                    ? user?.additionalDetails?.contuctNumber
                    : "Add Contact Number"}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-[75%] justify-between">
              <div className="w-[50%]">
                <p className="text-sm text-richblack-400">Gender</p>
                <p className="text-sm">
                  {user?.additionalDetails?.gender
                    ? user?.additionalDetails?.gender
                    : "Add Gender"}
                </p>
              </div>
              <div className="w-[50%]">
                <p className="text-sm text-richblack-400">Date Of Birth</p>
                <p className="text-sm">
                  {user?.additionalDetails?.dateOfBirth
                    ? user?.additionalDetails?.dateOfBirth
                    : "Add Date Of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
