import React from "react";
import Template from "../components/core/auth/Template";
import signUpImg from "../assets/Images/signup.webp";

const Signup = () => {
  return (
    <div className="mt-[100px] mb-20">
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signUpImg}
        formType="signup"
      ></Template>
    </div>
  );
};

export default Signup;
