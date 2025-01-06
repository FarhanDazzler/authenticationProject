import React, { useState } from "react";
import { handleError, handleSuccess } from "../utilis";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [signInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignInfo = { ...signInfo };
    copySignInfo[name] = value;
    setSignupInfo(copySignInfo);
  };
  console.log("copylogin", signInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "https://authentication-project-sigma.vercel.app/auth/signup";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInfo),
      });
      const result = await res.json();
      console.log(result);
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (error) {
        handleError(error);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log("Error", error);
      handleError(error);
    }
  };
  return (
    <div className="container">
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter the name"
            autoFocus
            value={signInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter the mail"
            value={signInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter the password"
            value={signInfo.password}
          />
        </div>
        <button className="btn">SignUp</button>
        <div className="loginClass">
          <h3>Already have a account?</h3>
          <Link to="/login">Login</Link>
        </div>

        {/* <a href="#">Login</a> */}
      </form>
      <ToastContainer />
    </div>
  );
}
