import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { VscDashboard } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { logOut } from "../../../services/operations/authAPI";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ProfileDropDown = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useOnClickOutside(ref, () => setOpen(false));

  const onClickHandler = () => {
    setOpen(false);
    setToggle(false);
  };

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-1">
        <img
          src={user?.image}
          alt=""
          className=" aspect-square w-[30px] rounded-full object-cover"
        ></img>
        <FaCaretDown className=" text-sm text-richblack-100"></FaCaretDown>
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
        >
          <Link to="/dashboard/my-profile" onClick={onClickHandler}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className=" text-lg"></VscDashboard>
              Dashboard
            </div>
          </Link>
          <div
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
            onClick={() => {
              dispatch(logOut(navigate));
              setOpen(false);
              setToggle(false);
            }}
          >
            <VscSignOut className=" text-lg"></VscSignOut>
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropDown;
