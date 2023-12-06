import React from "react";
import Navbar from "../features/navebar/Navebar";
import UserProfile from "../features/user/components/User";
import Footer from "../features/comman/Footer";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        <UserProfile></UserProfile>
      </Navbar>
      <Footer></Footer>

    </div>
  );
};

export default UserProfilePage;
