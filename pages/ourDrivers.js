import React from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import OurDriversIndex from "../Components/OurDrivers/OurDriversIndex";

const ourDrivers = () => {
  return (
    <div>
      <Navbar />
      <OurDriversIndex />
      <Footer />
    </div>
  );
};

export default ourDrivers;
