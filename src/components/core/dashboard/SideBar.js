import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../services/operations/authAPI";
import ConfrimationModal from "../../common/ConfrimationModal";

const SideBar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  const [confrimationModal, setConfrimationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: authLoading } = useSelector((state) => state.auth);

  if (authLoading || profileLoading) {
    return <div className="mt-[150px]">Loading....</div>;
  }

  return (
    <>
      <div className="hidden lg:flex fixed min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
        <div className="flex flex-col gap-4">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) {
              return null;
            }

            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
              ></SidebarLink>
            );
          })}
        </div>
        <div className="h-[2px] w-[80%] mx-auto bg-richblack-700 mt-6"></div>
        <div className="flex flex-col gap-4 mt-6">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          ></SidebarLink>

          <button
            className=" text-richblack-200 flex items-center gap-3 ml-5"
            onClick={() =>
              setConfrimationModal({
                text1: "Are You Sure",
                text2: "You will be logged out of your account",
                btn1Text: "Log out",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logOut(navigate)),
                btn2Handler: () => setConfrimationModal(null),
              })
            }
          >
            <VscSignOut className=" text-lg"></VscSignOut>
            <p className="text-sm">Log out</p>
          </button>
        </div>
      </div>

      <div className="w-full z-40 flex lg:hidden fixed bottom-0 bg-richblack-900 border-t border-t-richblack-700 justify-center">
        <div className="w-[95%] mx-auto flex items-center justify-between gap-2">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) {
              return null;
            }

            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
              ></SidebarLink>
            );
          })}
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          ></SidebarLink>
          <button
            className=" text-richblack-200 flex flex-col lg:flex-row items-center gap-3 ml-0 lg:ml-5"
            onClick={() =>
              setConfrimationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your account",
                btn1Text: "Log out",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logOut(navigate)),
                btn2Handler: () => setConfrimationModal(null),
              })
            }
          >
            <VscSignOut className="text-2xl sm:text-lg"></VscSignOut>
            <p className="text-sm hidden sm:flex">Log out</p>
          </button>
        </div>
      </div>
      {confrimationModal && (
        <ConfrimationModal modalData={confrimationModal}></ConfrimationModal>
      )}
    </>
  );
};

export default SideBar;
