import React from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import MyRidesIndex from "../Components/MyRides/MyRidesIndex";
import Footer from "../Components/Shared/Footer/Footer";

const myRides = () => {
  return (
    <div>
      <Navbar />
      <MyRidesIndex />
      <Footer />
    </div>
  );
};

export default myRides;
