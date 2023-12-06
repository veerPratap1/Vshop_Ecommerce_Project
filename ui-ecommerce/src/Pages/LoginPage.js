import React from "react";
import Login from "../features/Auth/components/Login";
import Navbar from "../features/navebar/Navebar";

const LoginPage = () => {
  return (
    <>
      <Navbar>
        <Login></Login>
      </Navbar>
    </>
  );
};

export default LoginPage;
