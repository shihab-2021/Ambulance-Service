import React from "react";
import Layout from "../../Components/Dashboard/Layout";
import MainAdminDashboardHome from "../../Components/Dashboard/AdminDashboardHome/MainAdminDashboardHome";
import useAuth from "../../Components/Context/useAuth";
import adminCheck from "../../Components/Context/adminCheck";

const Dashboard = () => {
  const { user, userInfo } = useAuth();
  return (
    <div className="bg-[#1e2124]">
      <Layout>
        {user && userInfo?.role === "admin" && <MainAdminDashboardHome />}
      </Layout>
    </div>
  );
};

export default adminCheck(Dashboard);
