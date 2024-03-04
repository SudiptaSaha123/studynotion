import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import CTAbutton from "../core/homePage/CTAbutton";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { IoCartOutline } from "react-icons/io5";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const result = await fetchCourseCategories();
      setSubLinks(result);
      setLoading(false);
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-full fixed z-40 h-14 flex items-center justify-center border-b-[1px] border-richblack-700 bg-richblack-900">
      <div className=" w-11/12 max-w-maxContent flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="" width={160} height={42}></img>
        </Link>

        <nav className=" hidden lg:flex items-center justify-between gap-14">
          <ul className="flex gap-6 text-richblack-5">
            {NavbarLinks.map((ele, i) => {
              return (
                <li key={i}>
                  {ele.title === "Catalog" ? (
                    <div className="flex relative z-0 items-center gap-2 cursor-pointer text-richblack-25 group font-bold">
                      <p>{ele.title}</p>
                      <MdKeyboardArrowDown></MdKeyboardArrowDown>
                      <div className=" invisible opacity-0 text-richblack-800 absolute w-[260px] top-[107%] -left-14 flex flex-col bg-richblack-5 rounded-md p-4 group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="h-6 w-6 absolute -top-1 left-[46.5%] rotate-45 rounded bg-richblack-5"></div>
                        {subLinks.length > 0 ? (
                          subLinks
                            .filter((sublink) => sublink?.courses?.length > 0)
                            .map((subLink, i) => (
                              <Link
                                className="z-10 py-2 px-2 rounded-md hover:bg-richblack-50"
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                
                              >
                                <p className="text[20px] font-normal">
                                  {subLink.name}
                                </p>
                              </Link>
                            ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={ele.path}>
                      <p
                        className={`${
                          matchRoute(ele?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25 hover:text-richblack-200 transition-all duration-200"
                        } font-bold transition-all duration-200`}
                      >
                        {ele.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* login signup dashboard */}
          <div className="flex gap-8 items-center text-lg">
            {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
              <Link
                to="/dashboard/cart-items"
                className="relative text-richblack-5 text-2xl"
              >
                <IoCartOutline></IoCartOutline>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 text-richblack-900 flex items-center justify-center rounded-full bg-yellow-100 text-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {token === null && (
              <CTAbutton active={false} linkto={"/login"}>
                Log in
              </CTAbutton>
            )}
            {token === null && (
              <CTAbutton active={false} linkto={"/signup"}>
                Sign up
              </CTAbutton>
            )}

            {token !== null && <ProfileDropDown></ProfileDropDown>}
          </div>
        </nav>

        {/* mobile nav  */}
        <div className=" lg:hidden">
          <div onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <IoClose className="w-[28px] h-[28px] cursor-pointer text-richblack-300"></IoClose>
            ) : (
              <HiMenuAlt3 className="w-[28px] cursor-pointer h-[28px] text-richblack-300"></HiMenuAlt3>
            )}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-20 rounded-md`}
          >
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-6 items-start">
                {NavbarLinks.map((ele, i) => (
                  <div key={i}>
                    {ele.title === "Catalog" ? (
                      <div className="flex relative items-center gap-2 cursor-pointer text-richblack-25 font-bold group">
                        <p>{ele.title}</p>
                        <MdKeyboardArrowDown></MdKeyboardArrowDown>
                        <div className=" invisible opacity-0 text-richblack-800 absolute w-[260px] -translate-x-40 top-[107%] flex flex-col bg-richblack-5 rounded-md p-4 group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <div className="h-6 w-6 absolute -top-1 left-[87%] rotate-45 rounded bg-richblack-5"></div>
                          {subLinks.length > 0 ? (
                            subLinks
                              .filter((sublink) => sublink?.courses?.length > 0)
                              .map((subLink, i) => (
                                <Link
                                  onClick={() => setToggle(false)}
                                  className="z-10 py-1 px-2 rounded-md hover:bg-richblack-50"
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link to={ele.path} onClick={() => setToggle(false)}>
                        <p
                          className={`${
                            matchRoute(ele?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25 hover:text-richblack-200 transition-all duration-200"
                          } font-bold`}
                        >
                          {ele.title}
                        </p>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
                  <Link
                    to="/dashboard/cart-items"
                    className="relative text-richblack-5 text-xl"
                  >
                    <IoCartOutline></IoCartOutline>
                    {totalItems > 0 && (
                      <span className="absolute -top-2 left-3 h-4 w-4 text-richblack-900 flex items-center justify-center rounded-full bg-yellow-100 text-sm">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}

                {token === null && (
                  <div onClick={() => setToggle(false)}>
                    <CTAbutton active={false} linkto={"/login"}>
                      Log in
                    </CTAbutton>
                  </div>
                )}
                {token === null && (
                  <div onClick={() => setToggle(false)}>
                    <CTAbutton active={false} linkto={"/signup"}>
                      Sign up
                    </CTAbutton>
                  </div>
                )}

                {token !== null && (
                  <ProfileDropDown
                    toggle={toggle}
                    setToggle={setToggle}
                  ></ProfileDropDown>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
