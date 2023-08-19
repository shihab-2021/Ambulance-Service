import React from "react";
import RideRequestDetailsMain from "../../Components/RideRequestDetails/RideRequestDetailsMain";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import Footer from "../../Components/Shared/Footer/Footer";
import authCheck from "../../Components/Context/authCheck";

const RideRequestDetails = () => {
  return (
    <div>
      <Navbar></Navbar>
      <RideRequestDetailsMain />
      <Footer />
    </div>
  );
};

export default authCheck(RideRequestDetails);
