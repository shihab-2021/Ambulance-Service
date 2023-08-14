import React from "react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import Footer from "../../Components/Shared/Footer/Footer";
import MyPendingRideDetails from "../../Components/MyPendingRideDetails/MyPendingRideDetails";

const myPendingRideDetails = () => {
  return (
    <div>
      <Navbar />
      <MyPendingRideDetails />
      <Footer />
    </div>
  );
};

export default myPendingRideDetails;
