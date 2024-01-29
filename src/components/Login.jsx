import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import { useDispatch } from "react-redux";
//import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const position = useRef(null);

  const password = useRef(null);
  const name = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    const signUpData = {
      email: email.current.value,
      password: password.current.value,
    };
    if (message) return;
    if (!isSignInForm) {
      // sign up logic
      try {
        const response = await axios.post(
          "http://localhost:3001/signup",
          signUpData
        );
        alert(response.data);
      } catch (error) {
        console.error(error);
        alert("Error signing up.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/login",
          signUpData
        );
        alert(response.data);
        if (response.status === 200) {
          navigate("./homepage");
        }
      } catch (error) {
        console.error(error);
        alert("Error logging in.");
      }
    }
  };
  return (
    <div className="relative z-10 min-h-screen bg-cover bg-center flex justify-center items-center bg-opacity-15 ">
      <div className="flex flex-col justify-start w-3/12  ">
        <div className="z-10 bg-black p-14 space-y-2 h-[30rem] text-white bg-opacity-70">
          <span className=" text-3xl font-bold p-2 m-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </span>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col  justify-between p-2 space-y-4 "
          >
            {!isSignInForm && (
              <input
                ref={name}
                className="px-4 py-2 h-[3rem] w-full outline-none rounded-md cursor-pointer text-white bg-[#333]"
                type="text"
                placeholder="Full Name"
              />
            )}
            {!isSignInForm && (
              <input
                ref={position}
                className="px-4 py-2 h-[3rem] w-full outline-none rounded-md cursor-pointer text-white bg-[#333]"
                type="text"
                placeholder="Position"
              />
            )}
            <input
              ref={email}
              className="px-4 py-2 h-[3rem] w-full outline-none rounded-md cursor-pointer text-white bg-[#333]"
              type="email"
              placeholder="Your Email or Phone No."
            />

            <input
              ref={password}
              className="px-4 py-2 mb-6 h-[3rem] w-full outline-none rounded-md cursor-pointer text-white bg-[#333]"
              type="password"
              placeholder="Password"
            />

            <p className="text-red-500">{errorMessage}</p>
            <button
              className="bg-red-700 p-2 mt-[2rem] h-[3rem] w-full rounded-md cursor-pointer"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm
                ? "New to this task app? Sign Up Now"
                : "Already registerd. Sign In now."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
