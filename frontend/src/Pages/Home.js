import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utilis";

export default function Home() {
  const [getUser, setGetUser] = useState("");
  const [getProduct, setGetProduct] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct = async () => {
    try {
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch("https://authentication-project-sigma.vercel.app/product", headers);
      const result = await response.json();
      setGetProduct(result);
      console.log("result", result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    setGetUser(localStorage.getItem("loggedInUser"));
    handleSuccess("User logged Successfully");
    fetchProduct();
  }, []);
  return (
    <div>
      <h1>{getUser}</h1>
      <div>
        {getProduct &&
          getProduct?.map((product, index) => (
            <ul className="listItem" key={index}>
              <span>{product.name}</span>:<span>{product.price}</span>
            </ul>
          ))}
      </div>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
      <ToastContainer />
    </div>
  );
}
