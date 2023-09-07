import React from "react";
import Layout from "../../Components/Dashboard/Layout";
import AddDoctorIndex from "../../Components/Dashboard/AddDoctor/AddDoctorIndex";

const AddDoctor = () => {
  return (
    <div className="bg-[#1e2124] text-white ">
      <Layout>
        <AddDoctorIndex />
      </Layout>
    </div>
  );
};

export default AddDoctor;
