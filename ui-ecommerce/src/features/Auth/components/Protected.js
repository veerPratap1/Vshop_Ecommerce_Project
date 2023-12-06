import React from "react";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
  const user = useSelector(selectLoginUser);

  if (!user) {
    return <Navigate to="/login" replace={false}></Navigate>;
  }
  return children;
};

export default Protected;
