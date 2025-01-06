import React, { useState } from "react";
import { handleError, handleSuccess } from "../utilis";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignInfo = { ...loginInfo };
    copySignInfo[name] = value;
    setLoginInfo(copySignInfo);
  };
  console.log("copylogin", loginInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    try {
      const url = "https://authentication-project-sigma.vercel.app/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await res.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
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
      <h1>Login Up Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter the mail"
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter the password"
            value={loginInfo.password}
          />
        </div>
        <button className="btn">Login</button>
        <div className="loginClass">
          <h3>Don't have a account?</h3>
          <Link to="/signup">SignUp</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
