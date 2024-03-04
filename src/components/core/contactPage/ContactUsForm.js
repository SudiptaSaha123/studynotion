import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CountryCodes from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactFormHandler = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      toast.success("Message Sent Successfully");
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      toast.error("Could Not Send Message");
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className="w-full flex flex-col gap-5"
      onSubmit={handleSubmit(submitContactFormHandler)}
    >
      <div className="flex flex-col sm:flex-row w-full gap-4 items-center">
        <label className="flex flex-col w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            First Name
          </p>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          ></input>
          {errors.firstName && <span>Enter Your Name</span>}
        </label>
        <label className="flex flex-col w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Last Name
          </p>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            {...register("lastName")}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          ></input>
        </label>
      </div>

      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address
        </p>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email Address"
          {...register("email", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        ></input>
        {errors.email && <span>Enter Your Email Address</span>}
      </label>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Phone Number
        </p>
        <div className="flex gap-4 items-center">
          <div className="w-[100px] overflow-x-hidden">
            <select
              name="dropdown"
              {...register("countryCode", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            >
              {CountryCodes.map((element, i) => {
                return (
                  <option key={i} value={element.code}>
                    {element.code} - {element.country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <input
              type="number"
              name="phoneNumber"
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: true,
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            ></input>
          </div>
        </div>
        {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
      </label>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Message
        </p>
        <textarea
          name="message"
          cols="30"
          rows="7"
          placeholder="Enter Your Message"
          {...register("message", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        ></textarea>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
