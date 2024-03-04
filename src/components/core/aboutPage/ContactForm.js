import React from "react";
import ContactUsForm from "../contactPage/ContactUsForm";

const ContactForm = () => {
  return (
    <div className="w-full my-20">
      <div className="mx-auto w-[95%] md:w-[400px] flex flex-col gap-8 items-center">
        <div className=" flex flex-col gap-2">
          <p className=" text-[28px] font-semibold text-richblack-5 text-center">
            Get in Touch
          </p>
          <p className=" text-sm text-richblack-300 text-center">
            We’d love to here for you, Please fill out this form.
          </p>
        </div>

        <ContactUsForm></ContactUsForm>
      </div>
    </div>
  );
};

export default ContactForm;
