/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCommentDetail, BiHeart } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { ImFlag } from "react-icons/im";
import useAuth from "../../Context/useAuth";

const UserInfo = (props) => {
  const [completedRides, setCompletedRides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [selectedRide, setSelectedRide] = useState({});
  const { user, userInfo } = useAuth();
  const [reportReason, setReportReason] = useState("");

  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://rescue-reach-server.vercel.app/users-data/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() =>
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
          })
      )
      .catch((error) => {
        console.log(error.message);
      });
  }, [user?.email]);
  function formatDate(inputDate) {
    if (inputDate) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const [year, month, day] = inputDate?.split("-");
      const monthName = months[Number(month) - 1];

      return `${monthName} ${day}, ${year}`;
    }
  }
  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(dateString).toLocaleTimeString("en-US", options);
  };
  function formatJoinDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }
  const date = formatDate(props?.data?.birthDate);
  const joinDate = formatJoinDate(props?.data?.joinDate);

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
  return (
    <div>
      <div className="container px-4 mx-auto font-sansita ">
        <div className="bg-gray-100 ">
          <div className="my-5 p-5">
            <div className="grid grid-cols-12 gap-4">
              {/* <!-- Left Side Start --> */}
              <div className="col-span-12 w-full lg:col-span-4">
                {/* <!-- Profile Card --> */}
                <div className="border-t-4 border-green-400 rounded-lg bg-white p-3 ">
                  <div
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                    className="image mx-auto overflow-hidden rounded-lg border-2"
                  >
                    <img className="w-full" src={props?.data?.image} alt="" />
                  </div>
                  <h1 className="my-1 text-center text-2xl font-bold leading-8 text-gray-900 ">
                    {props?.data?.displayName}
                  </h1>
                  <h3 className=" text-semibold text-center text-gray-600 ">
                    {props?.data?.role}
                  </h3>
                  <p className="pt-2 text-sm leading-6 text-gray-500 hover:text-gray-600 text-justify">
                    {props?.data?.biography}
                  </p>
                  {props?.data?.email === data?.email && (
                    <div className="w-100 flex justify-center">
                      <Link href="/giveInfo">
                        <p className="border border-teal-400 p-2 my-5 rounded">
                          Update Profile
                        </p>
                      </Link>
                    </div>
                  )}
                  <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm ">
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">{joinDate}</span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
              </div>
              {/* <!-- Left Side End --> */}
              {/* <!-- Right Side Start --> */}
              <div className="col-span-12 mb-6 w-full lg:col-span-8">
                {/* <!-- Profile tab --> */}
                {/* <!-- About Section --> */}
                <div className="rounded-sm bg-white p-3 shadow-sm ">
                  <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className=" tracking-wide">About</span>
                  </div>
                  <div className="text-gray-700 ">
                    <div className="grid text-base md:grid-cols-2">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Gender
                        </div>
                        <div className="col-span-8 break-words py-2 ">
                          {props?.data?.gender}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Address
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {props?.data?.address}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Phone
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {props?.data?.phone}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Email
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {props?.data?.email}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Birth Date
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {date != "Invalid Date" && date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End of about section --> */}
                <div className=" my-16 ">
                  <h4 className="text-lg w-fit uppercase md:text-xl lg:text-2xl">
                    Ride History
                    <hr className="w-[73px] mx-auto rounded-full animate-ping border-b-4 border-green-300 " />
                  </h4>
                  {!isLoading && !completedRides[0] && (
                    <div>
                      <h1 className="text-2xl mt-16  text-center">
                        Currently you haven't completed any ride!
                      </h1>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4 my-5">
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
                                Patient:{" "}
                                {ride?.patientSide?.requester?.displayName}
                              </p>
                            ) : (
                              <p className="text-xl font-bold">
                                Driver:{" "}
                                {ride?.driverSide?.driverInfo?.displayName}
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
                                        {Object.keys(reportPatientReasons).map(
                                          (key) => (
                                            <button
                                              key={key}
                                              value={reportPatientReasons[key]}
                                              className="my-2 w-full dark:bg-Dark bg-slate-200  px-3 py-2 rounded-md flex items-center text-left font-semibold"
                                              onClick={(e) =>
                                                setReportReason(e.target.value)
                                              }
                                            >
                                              {key === reportReason && (
                                                <span className="pr-2 text-green-600">
                                                  <FaCheck />
                                                </span>
                                              )}
                                              {reportPatientReasons[key]}
                                            </button>
                                          )
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {Object.keys(reportDriverReasons).map(
                                          (key) => (
                                            <button
                                              key={key}
                                              value={reportDriverReasons[key]}
                                              className="my-2 w-full dark:bg-Dark bg-slate-200  px-3 py-2 rounded-md flex items-center text-left font-semibold"
                                              onClick={(e) =>
                                                setReportReason(e.target.value)
                                              }
                                            >
                                              {reportDriverReasons[key] ===
                                                reportReason && (
                                                <span className="pr-2 text-green-600">
                                                  <FaCheck />
                                                </span>
                                              )}
                                              {reportDriverReasons[key]}
                                            </button>
                                          )
                                        )}
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
                {/* <!-- End of profile tab --> */}
              </div>
              {/* <!-- Right Side End --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
