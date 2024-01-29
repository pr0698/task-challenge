import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  console.log(user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    //  <div className="absolute  top-0 left-0 inset-0  bg-gradient-to-b from-black h-28 flex flex-row  justify-between">
    <div className="flex flex-row-reverse p-4">
      <button onClick={handleSignOut} className="text-xl text-black ">
        ➡️
      </button>
    </div>
    // </div>
  );
};

export default Header;
