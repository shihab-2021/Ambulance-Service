import React, { useEffect, useState } from "react";
import RideRequests from "./RideRequests";
import UnbookedRide from "./UnbookedRide";
import Counting from "./Counting";
import LatestUsers from "./LatestUsers";
import ReportedUsers from "./ReportedUsers";

const MainAdminDashboardHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookedRides, setBookedRides] = useState();
  const [rideRequests, setRideRequests] = useState();
  const [users, setUsers] = useState();
  const [reportedUsers, setReportedUsers] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://rescue-reach-server.vercel.app/rideBooked")
      .then((res) => res.json())
      .then((data) => setBookedRides(data.reverse()))
      .then(() => {
        fetch("https://rescue-reach-server.vercel.app/rideRequest")
          .then((res) => res.json())
          .then((data) => setRideRequests(data));
      })
      .then(() => {
        fetch("https://rescue-reach-server.vercel.app/users")
          .then((res) => res.json())
          .then((data) => setUsers(data.reverse()));
      })
      .then(() => {
        fetch("https://rescue-reach-server.vercel.app/report")
          .then((res) => res.json())
          .then((data) => setReportedUsers(data.reverse()));
      })
      .then(() => setIsLoading(false));
  }, []);
  return (
    <>
      <div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          <RideRequests bookedRides={bookedRides} />
          <UnbookedRide rideRequests={rideRequests} />
        </div>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Counting users={users} />
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 my-4">
          <LatestUsers users={users} />
          <ReportedUsers reportedUsers={reportedUsers} />
        </div>
      </div>
    </>
  );
};

export default MainAdminDashboardHome;
