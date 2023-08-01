import React from "react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import UserProfileMain from "../../Components/UserProfile/UserProfileMain/UserProfileMain";
import Footer from "../../Components/Shared/Footer/Footer";
import authCheck from "../../Components/Context/authCheck";

const User = () => {
  return (
    <div>
      <Navbar></Navbar>
      <UserProfileMain></UserProfileMain>
      <Footer />
    </div>
  );
};

export default authCheck(User);
