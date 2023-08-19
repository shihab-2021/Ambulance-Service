import React from "react";
import Layout from "../../../Components/Dashboard/Layout";
import ReportDetailsIndex from "../../../Components/Dashboard/ReportDetails/ReportDetailsIndex";
import authCheck from "../../../Components/Context/authCheck";

const report = () => {
  return (
    <div>
      <div className="bg-[#1e2124] text-white ">
        <Layout>
          <ReportDetailsIndex />
        </Layout>
      </div>
    </div>
  );
};

export default authCheck(report);
