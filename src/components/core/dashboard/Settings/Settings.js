import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[800px] mx-auto mt-16 mb-24">
        <h1 className="text-4xl font-semibold">Edit Profile</h1>
        {/* Change Profile Picture */}
        <ChangeProfilePicture></ChangeProfilePicture>
        {/* Edit Profile  */}
        <EditProfile></EditProfile>
        {/* Update Password  */}
        <UpdatePassword></UpdatePassword>
        {/* Delete Account  */}
        <DeleteAccount></DeleteAccount>
      </div>
    </div>
  );
};

export default Settings;
