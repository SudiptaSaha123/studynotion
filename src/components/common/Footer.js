import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FooterLink2 } from "../../data/footer-links";

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
  return (
    <div className="bg-richblack-800 mt-16">
      <div className="w-11/12 max-w-maxContent flex flex-col mx-auto pt-20">
        <div className="flex flex-wrap items-start justify-between">
          {/* left side  */}
          <div className=" w-[49%] flex flex-wrap items-start justify-between pr-6">
            {/* 1 */}
            <div className="flex flex-col gap-5">
              <div>
                <img src={Logo} alt=""></img>
              </div>
              <div className=" flex flex-col gap-5">
                <p className=" text-richblack-50 text-lg font-bold">Company</p>
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div className="flex flex-col gap-4 text-richblack-300 hover:text-richblack-50 transition-all duration-200">
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-5 flex-wrap items-center text-[24px] text-richblack-300">
                <FaFacebook className="hover:text-richblack-50 transition-all duration-200 cursor-pointer"></FaFacebook>
                <FaGoogle className="hover:text-richblack-50 transition-all duration-200 cursor-pointer"></FaGoogle>
                <FaTwitter className="hover:text-richblack-50 transition-all duration-200 cursor-pointer"></FaTwitter>
                <FaYoutube className="hover:text-richblack-50 transition-all duration-200 cursor-pointer"></FaYoutube>
              </div>
            </div>

            {/* 2 */}
            <div className=" flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <h2 className="text-richblack-50 text-lg font-bold">
                  Resources
                </h2>
                <div className="flex flex-col gap-3">
                  {Resources.map((ele, i) => {
                    return (
                      <p className=" text-richblack-300 cursor-pointer hover:text-richblack-50 transition-all duration-200">
                        {ele}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-richblack-50 text-lg font-bold">Support</h2>
                <p className="text-richblack-300 cursor-pointer hover:text-richblack-50 transition-all duration-200">
                  Help Center
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <h2 className="text-richblack-50 text-lg font-bold">Plans</h2>
                <div className="flex flex-col gap-3">
                  {Plans.map((ele, i) => {
                    return (
                      <p className="text-richblack-300 cursor-pointer hover:text-richblack-50 transition-all duration-200">
                        {ele}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-richblack-50 text-lg font-bold">
                  Community
                </h2>
                <div className="flex flex-col gap-3">
                  {Community.map((ele, i) => {
                    return (
                      <p className="text-richblack-300 cursor-pointer hover:text-richblack-50 transition-all duration-200">
                        {ele}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* right side  */}
          <div className=" w-[49%] flex flex-wrap items-start justify-between pl-6 border-l border-richblack-700">
            {FooterLink2.map((ele, i) => {
              return (
                <div className="flex flex-col gap-4">
                  <h2 className="text-richblack-50 text-lg font-bold">
                    {ele.title}
                  </h2>
                  <div className=" text-richblack-300 flex flex-col gap-3">
                    {ele.links.map((e, i) => {
                      return (
                        <div className="hover:text-richblack-50 transition-all duration-200">
                          <Link to={e.link}>{e.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between w-full flex-col lg:flex-row gap-3 lg:gap-0 items-center py-10 mt-11 border-t border-richblack-700">
          <div className="flex">
            {BottomFooter.map((ele, i) => {
              return (
                <p
                  className={` text-lg text-richblack-300 px-7 py-1 ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700"
                  }`}
                >
                  {ele}
                </p>
              );
            })}
          </div>
          <div className=" text-richblack-300">
            Made by ❤️ Ankan © 2023 Studynotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
