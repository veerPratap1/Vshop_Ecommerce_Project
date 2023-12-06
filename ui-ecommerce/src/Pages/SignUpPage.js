import React from "react";
import SignUp from "../features/Auth/components/SignUp";
import Navbar from "../features/navebar/Navebar";

const SignUpPage = () => {
  return (
    <>
      <Navbar>
        <SignUp></SignUp>
      </Navbar>
    </>
  );
};

export default SignUpPage;
