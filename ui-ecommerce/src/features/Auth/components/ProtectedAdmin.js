import React from "react";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/UserSlice";

const ProtectedAdmin = ({children}) => {
  const user = useSelector(selectLoginUser);
  const userInfo = useSelector(selectUserInfo)

  if (!user) {
    return <Navigate to="/login" replace={false}></Navigate>;
  }
  if(user && userInfo && userInfo.role !== "admin"){
    return <Navigate to="/" replace={false}></Navigate>;
  }
  return children;
};

export default ProtectedAdmin;
