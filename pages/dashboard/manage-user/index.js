import React from "react";
import adminCheck from "../../../Components/Context/adminCheck";
import ManageUserMain from "../../../Components/Dashboard/ManageUser/ManageUserMain";
import Layout from "../../../Components/Dashboard/Layout";

const ManageUser = () => {
  return (
    <div className="bg-[#1e2124] text-white ">
      <Layout>
        <ManageUserMain />
      </Layout>
    </div>
  );
};

export default adminCheck(ManageUser);
