import React, { useEffect, useState } from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import DoctorsInformation from "../Components/DoctorInformation/DoctorsInformation";

const DoctorInfo = () => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://rescue-reach-server.vercel.app/doctor")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setDoctors(data);
      });
  }, []);
  console.log(doctors);
  return (
    <div>
      <Navbar />
      <DoctorsInformation doctors={doctors} />
      <Footer />
    </div>
  );
};

export default DoctorInfo;
