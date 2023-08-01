import React from "react";
import RideRequests from "./RideRequests";
import UnbookedRide from "./UnbookedRide";
import Counting from "./Counting";
import LatestUsers from "./LatestUsers";
import ReportedUsers from "./ReportedUsers";

const MainAdminDashboardHome = () => {
  return (
    <>
      <div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          <RideRequests />
          <UnbookedRide />
          {/* <RoomRequests payments={payments}></RoomRequests>
          <LatestTransactions rooms={rooms}></LatestTransactions> */}
        </div>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* <Counting rooms={rooms} users={users} meals={meals}></Counting> */}
          <Counting />
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 my-4">
          <LatestUsers />
          <ReportedUsers />
          {/* <LatestCustomers users={users}></LatestCustomers>
          <RoomLeaving payments={payments}></RoomLeaving> */}
        </div>
      </div>
    </>
  );
};

export default MainAdminDashboardHome;
