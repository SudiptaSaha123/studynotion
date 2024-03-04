import React from "react";
import { FaMessage } from "react-icons/fa6";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import ContactUsForm from "../components/core/contactPage/ContactUsForm";
import Footer from "../components/common/Footer";

const contactOption = [
  {
    icon: <FaMessage className=" text-richblack-100 text-[25px]"></FaMessage>,
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    info: "ankan.hazra1710@gmail.com",
  },
  {
    icon: (
      <BsGlobeEuropeAfrica className="text-richblack-100 text-[25px]"></BsGlobeEuropeAfrica>
    ),
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    info: "Kolkata",
  },
  {
    icon: <MdCall className="text-richblack-100 text-[25px]"></MdCall>,
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    info: "+123 456 7890",
  },
];

const Contact = () => {
  return (
    <div className="w-full mt-28">
      <div className=" w-11/12 max-w-maxContent mx-auto flex flex-col md:flex-row gap-9 md:gap-5 items-start justify-between">
        <div className="w-full md:w-[400px] p-9 bg-richblack-800 rounded-xl flex flex-col gap-10">
          {contactOption.map((ele, i) => {
            return (
              <div className="flex items-start gap-4">
                {ele.icon}
                <div className="flex flex-col gap-1">
                  <p className=" text-lg text-richblack-100 font-semibold">
                    {ele.heading}
                  </p>
                  <p className="text-sm text-richblack-200">
                    {ele.description}
                  </p>
                  <p className="text-sm text-richblack-200">{ele.info}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" p-6 md:p-[52px] border border-richblack-500 rounded-xl w-full md:w-[635px]">
          <div className="flex flex-col gap-2 mb-7">
            <h1 className="text-3xl font-semibold text-richblack-25">
              Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className="text-sm text-richblack-300">
              Tall us more about yourself and what you’re got in mind.
            </p>
          </div>
          <ContactUsForm></ContactUsForm>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Contact;
