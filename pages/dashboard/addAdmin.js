import React, { useState } from "react";
import Layout from "../../Components/Dashboard/Layout";
import ManageAdmins from "../../Components/Dashboard/ManageAdmins/ManageAdmins";
import AddAdminMain from "../../Components/Dashboard/AddAdmin/AddAdminMain";
import adminCheck from "../../Components/Context/adminCheck";

const AddAdmin = () => {
  return (
    <div className="bg-[#1e2124] text-white ">
      <Layout>
        <div className="card-design bg-[#36393e52] rounded-[.5rem] p-5">
          <ManageAdmins></ManageAdmins>
          <AddAdminMain></AddAdminMain>
        </div>
      </Layout>
    </div>
  );
};

export default adminCheck(AddAdmin);
