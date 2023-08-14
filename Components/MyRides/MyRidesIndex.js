import React, { useEffect, useState } from "react";
import Loading from "../Shared/Loading/Loading";
import useAuth from "../Context/useAuth";
import { FaCheck } from "react-icons/fa";
import swal from "sweetalert";
import Link from "next/link";

const MyRidesIndex = () => {
  const [bookedRides, setBookedRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [selectedRide, setSelectedRide] = useState({});
  const { user, userInfo } = useAuth();
  const [reportReason, setReportReason] = useState("");

  // report  handler here
  const handleReport = () => {
    if (userInfo?.email) {
      if (!reportReason) {
        swal({
          icon: "warning",
          title: "Reason not selected!",
          text: "You have to select a reason for reporting",
        });
      } else {
        const payload = {
          reportReason,
          reportedBy: userInfo,
          reportedTo:
            userInfo?.role === "Driver"
              ? selectedRide?.patientSide?.requester
              : selectedRide?.driverSide?.driverInfo,
          rideInfo: (({ ["requester"]: _, ...rest }) => rest)(
            selectedRide?.patientSide
          ),
        };
        setIsLoading(true);
        fetch("https://rescue-reach-server.vercel.app/report")
          .then((res) => res.json())
          .then((data) => {
            const reportCheck = data?.find(
              (item) =>
                item?.reportedBy?.email === payload?.reportedBy?.email &&
                item?.reportedTo?.email === payload?.reportedTo?.email
            );
            if (reportCheck) {
              swal({
                icon: "error",
                title: "Not allowed!",
                text: "You can't report a user twice",
              });
              setReportReason("");
              setIsLoading(false);
              setOpenReport(false);
            } else {
              fetch("https://rescue-reach-server.vercel.app/report", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...payload,
                }),
              }).then(() => {
                swal("Report send successfully!", {
                  icon: "success",
                });
                setReportReason("");
                setIsLoading(false);
                setOpenReport(false);
              });
            }
          });
      }
    } else {
      swal({
        icon: "warning",
        title: "User information not found!",
        text: "Please reload if you are logged in",
      });
      return;
    }
  };

  const reportDriverReasons = {
    "For breaking the first rule": "1- Unsafe Driving Practices",
    "For breaking the second rule": "2- Inappropriate Behavior of Driver",
    "For breaking the third rule": "3- Excessive Delays in Pickup",
    "For breaking the fourth rule": "4- Vehicle Maintenance Issues",
    "For breaking the fifth rule": "5- Failure to Follow Route",
    "Something else ": "6- Something else ",
  };

  const reportPatientReasons = {
    "For breaking the first rule": "1- Aggressive Passenger Behavior",
    "For breaking the second rule": "2- Refusing to Follow Safety Rules",
    "For breaking the third rule": "3- Passenger Harassment or Misconduct",
    "For breaking the fourth rule": "4- Intoxicated or Unruly Passenger",
    "For breaking the fifth rule": "5- Safety Concerns During Ride",
    "Something else ": "6- Something else ",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(dateString).toLocaleTimeString("en-US", options);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://rescue-reach-server.vercel.app/rideBooked")
      .then((res) => res.json())
      .then((data) => {
        if (userInfo?.role === "Driver") {
          const booked = data?.filter(
            (item) => item?.driverSide?.driverInfo?.email === user?.email
          );
          setBookedRides(booked);
        } else {
          const booked = data?.filter(
            (item) => item?.patientSide?.requester?.email === user?.email
          );
          setBookedRides(booked);
        }
        fetch("https://rescue-reach-server.vercel.app/rideCompleted")
          .then((res) => res.json())
          .then((data) => {
            if (userInfo?.role === "Driver") {
              const completed = data?.filter(
                (item) => item?.driverSide?.driverInfo?.email === user?.email
              );
              setCompletedRides(completed);
            } else {
              const completed = data?.filter(
                (item) => item?.patientSide?.requester?.email === user?.email
              );
              setCompletedRides(completed.reverse());
            }
            setIsLoading(false);
          });
      });
  }, [user, user?.email, userInfo, userInfo?.email]);

  return (
    <div>
      {isLoading && (
        <div className="absolute w-full h-full">
          <Loading />
        </div>
      )}
      <div className="px-4 min-h-[50vh] font-sansita my-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
        <h3 className="text-xl md:text-2xl lg:text-4xl mb-7 text-black lg:text-start uppercase font-bold">
          <span className="text-green-300">My </span>Rides
          <hr className="w-[73px] border-b-4 border-green-300 " />{" "}
        </h3>
        <div>
          <h4 className="text-lg md:text-xl uppercase w-fit lg:text-2xl">
            Your pending riders
            <hr className="w-[73px] mx-auto rounded-full animate-ping border-b-4 border-rose-300 " />
          </h4>
          {!isLoading && !bookedRides[0] && (
            <div>
              <h1 className="text-2xl mt-16  text-center">
                Currently you don't have any pending ride!
              </h1>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
            {bookedRides?.map((ride) => (
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg shadow-xl p-6 hover:shadow-2xl transition duration-300">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {ride?.patientSide?.pickUpLocation} to{" "}
                  {ride?.patientSide?.dropLocation}
                </h2>
                <p className="text-gray-200 mb-4">
                  {formatDate(ride?.patientSide?.rideDateTime)} -{" "}
                  {formatTime(ride?.patientSide?.rideDateTime)}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-300 pt-4">
                  <div className="text-white">
                    {userInfo?.role === "Driver" ? (
                      <p className="text-xl font-bold">
                        Patient: {ride?.patientSide?.requester?.displayName}
                      </p>
                    ) : (
                      <p className="text-xl font-bold">
                        Driver: {ride?.driverSide?.driverInfo?.displayName}
                      </p>
                    )}
                    <p className="text-[#FFD700] font-extrabold mt-2 text-xl">
                      <span className="font-bold">Cost:</span>{" "}
                      {ride?.patientSide?.cost}tk
                    </p>
                  </div>
                  <div className="text-white space-y-2">
                    <p className="text-xl font-bold">
                      Ambulance Number:{"  "}
                      <span className=" font-semibold">
                        {ride?.driverSide?.ambulanceNumber || "N/A"}
                      </span>
                    </p>

                    <p className="text-xl font-bold">
                      Ambulance Model:{"  "}
                      <span className=" font-semibold">
                        {ride?.driverSide?.ambulanceModel || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                <Link href={`/myPendingRideDetails/${ride?._id}`}>
                  <button className="mt-6 bg-yellow-500 text-white py-2 px-6 rounded-full hover:btn-ghost btn focus:outline-none transform transition ">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className=" my-16 ">
          <h4 className="text-lg w-fit uppercase md:text-xl lg:text-2xl">
            Your Ride History
            <hr className="w-[73px] mx-auto rounded-full animate-ping border-b-4 border-green-300 " />
          </h4>
          {!isLoading && !completedRides[0] && (
            <div>
              <h1 className="text-2xl mt-16  text-center">
                Currently you haven't completed any ride!
              </h1>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
            {completedRides?.map((ride) => (
              <div className="bg-gradient-to-r from-teal-400 to-blue-400 rounded-lg shadow-xl p-6 hover:shadow-2xl transition duration-300">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {ride?.patientSide?.pickUpLocation} to{" "}
                  {ride?.patientSide?.dropLocation}
                </h2>
                <p className="text-gray-200 mb-4">
                  {formatDate(ride?.patientSide?.rideDateTime)} -{" "}
                  {formatTime(ride?.patientSide?.rideDateTime)}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-300 pt-4">
                  <div className="text-white">
                    {userInfo?.role === "Driver" ? (
                      <p className="text-xl font-bold">
                        Patient: {ride?.patientSide?.requester?.displayName}
                      </p>
                    ) : (
                      <p className="text-xl font-bold">
                        Driver: {ride?.driverSide?.driverInfo?.displayName}
                      </p>
                    )}
                    <p className="text-[#FFD700] font-extrabold mt-2 text-xl">
                      <span className="font-bold">Cost:</span>{" "}
                      {ride?.patientSide?.cost}tk
                    </p>
                  </div>
                  <div className="text-white space-y-2">
                    <p className="text-xl font-bold">
                      Ambulance Number:{"  "}
                      <span className=" font-semibold">
                        {ride?.driverSide?.ambulanceNumber || "N/A"}
                      </span>
                    </p>

                    <p className="text-xl font-bold">
                      Ambulance Model:{"  "}
                      <span className=" font-semibold">
                        {ride?.driverSide?.ambulanceModel || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOpenReport(true);
                    setSelectedRide(ride);
                  }}
                  className="mt-6 bg-rose-500 text-white py-2 px-6 rounded-full hover:btn-ghost btn focus:outline-none transform transition "
                >
                  Report Ride
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openReport && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg dark:bg-Dark bg-slate-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="dark:bg-lightDark bg-slate-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-xl font-bold flex items-center flex-col sm:flex-row gap-4 mb-0 leading-6"
                        id="modal-title"
                      >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-red-600 dark:text-lightBlue"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                            />
                          </svg>
                        </div>
                        Why do you want to report this ride?{" "}
                      </h3>
                      <div className="mt-2">
                        {userInfo?.role === "Driver" ? (
                          <>
                            {Object.keys(reportPatientReasons).map((key) => (
                              <button
                                key={key}
                                value={reportPatientReasons[key]}
                                className="my-2 w-full dark:bg-Dark bg-slate-200  px-3 py-2 rounded-md flex items-center text-left font-semibold"
                                onClick={(e) => setReportReason(e.target.value)}
                              >
                                {key === reportReason && (
                                  <span className="pr-2 text-green-600">
                                    <FaCheck />
                                  </span>
                                )}
                                {reportPatientReasons[key]}
                              </button>
                            ))}
                          </>
                        ) : (
                          <>
                            {Object.keys(reportDriverReasons).map((key) => (
                              <button
                                key={key}
                                value={reportDriverReasons[key]}
                                className="my-2 w-full dark:bg-Dark bg-slate-200  px-3 py-2 rounded-md flex items-center text-left font-semibold"
                                onClick={(e) => setReportReason(e.target.value)}
                              >
                                {reportDriverReasons[key] === reportReason && (
                                  <span className="pr-2 text-green-600">
                                    <FaCheck />
                                  </span>
                                )}
                                {reportDriverReasons[key]}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dark:bg-lightDark bg-slate-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleReport}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Report
                  </button>
                  <button
                    onClick={() => {
                      setOpenReport(false);
                      setReportReason("");
                    }}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRidesIndex;
