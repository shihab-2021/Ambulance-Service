import React from "react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import UserProfileMain from "../../Components/UserProfile/UserProfileMain/UserProfileMain";
import Footer from "../../Components/Shared/Footer/Footer";

const User = () => {
  return (
    <div>
      <Navbar></Navbar>
      <UserProfileMain></UserProfileMain>
      <Footer />
    </div>
  );
};

export default User;
