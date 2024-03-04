import React from "react";
import * as Icons from "react-icons/vsc";
import { useLocation, matchPath, NavLink } from "react-router-dom";
import * as cartIcon from "react-icons/io5";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName] || cartIcon[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      className={`${
        matchRoute(link.path)
          ? "border-b-[2px] lg:border-l-[3px] lg:border-b-0 border-b-yellow-100 lg:border-l-yellow-100 bg-yellow-800"
          : ""
      }pl-0 lg:pl-5 py-2 px-1`}
    >
      <div
        className={`flex flex-col lg:flex-row items-center gap-3 ${
          matchRoute(link.path) ? "text-yellow-100" : " text-richblack-200"
        }`}
      >
        <Icon className="text-2xl sm:text-lg"></Icon>
        <p className="text-sm hidden sm:flex">{link.name}</p>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
