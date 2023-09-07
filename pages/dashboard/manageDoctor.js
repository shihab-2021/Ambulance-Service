import React from "react";
import Layout from "../../Components/Dashboard/Layout";
import ManageDoctorIndex from "../../Components/Dashboard/ManageDoctor/ManageDoctorIndex";

const ManageDoctor = () => {
  return (
    <div className="bg-[#1e2124] text-white ">
      <Layout>
        <ManageDoctorIndex />
      </Layout>
    </div>
  );
};

export default ManageDoctor;
