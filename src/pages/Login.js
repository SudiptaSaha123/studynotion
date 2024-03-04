import React from "react";
import Template from "../components/core/auth/Template";
import LoginImg from "../../src/assets/Images/login.webp";

const Login = () => {
  return (
    <div className="mt-[100px] mb-20">
      <Template
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={LoginImg}
        formType="login"
      ></Template>
    </div>
  );
};

export default Login;
