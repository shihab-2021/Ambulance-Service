import React from "react";
import GiveInfoMain from "../Components/GiveInfo/GiveInfoMain";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import authCheck from "../Components/Context/authCheck";

const giveInfo = () => {
  return (
    <div>
      <Navbar />
      <GiveInfoMain />
      <Footer />
    </div>
  );
};

export default authCheck(giveInfo);
