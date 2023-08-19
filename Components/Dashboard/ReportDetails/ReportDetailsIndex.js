import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ReportDetailsIndex = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const [reportInfo, setReportInfo] = useState({});
  const [reportedUsers, setReportedUsers] = useState([]);
  const [otherReports, setOtherReports] = useState([]);
  useEffect(() => {
    if (id) {
      fetch(`https://rescue-reach-server.vercel.app/report/${id}`)
        .then((res) => res.json())
        .then((data) => setReportInfo(data))
        .then(() => {
          fetch("https://rescue-reach-server.vercel.app/report")
            .then((res) => res.json())
            .then((data) => {
              setReportedUsers(data);
              const reportFilter = data?.filter(
                (item) =>
                  item?._id !== reportInfo?._id &&
                  item?.reportedTo?.email === reportInfo?.reportedTo?.email
              );
              setOtherReports(reportFilter);
            });
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      // router.replace("/");
    }
  }, [id]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(dateString).toLocaleTimeString("en-US", options);
  };
  const currentDate = new Date();
  const calculateDateDifference = (dateString) => {
    const dbDate = new Date(dateString);
    const differenceInMilliseconds = currentDate - dbDate;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;

    return differenceInDays.toFixed(0);
  };

  const removeUser = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = fetch(
          `https://rescue-reach-server.vercel.app/delete-user/${reportInfo?.reportedTo?._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then(() =>
            fetch(
              `https://rescue-reach-server.vercel.app/delete-report/${reportInfo?._id}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then(() =>
                swal("User delete successful!", {
                  icon: "success",
                })
              )
              .then(() => router?.replace("/dashboard"))
          )
          .then((data) => console.log(data));
      }
    });
  };

  return (
    <div>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className=" bg-[#36393e52] shadow-lg rounded-lg mb-4 p-4 sm:p-6 h-full">
          <h3 className="text-md md:text-lg lg:text-xl mb-7 text-white lg:text-start uppercase font-bold">
            Reported To
            <hr className="w-[73px] border-b-4 border-green-300 " />{" "}
          </h3>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={reportInfo?.reportedTo?.image}
              alt={`profile`}
              className="w-16 h-16 rounded-full object-cover  "
            />
            <div>
              <h2 className="text-xl font-semibold">
                {reportInfo?.reportedTo?.displayName}
              </h2>
            </div>
          </div>
          <p className="text-white">Email: {reportInfo?.reportedTo?.email}</p>
          <p className="text-white">Phone: {reportInfo?.reportedTo?.phone}</p>
          <p className="text-white">
            Address: {reportInfo?.reportedTo?.address}
          </p>
          <p className="text-white">{reportInfo?.reportedTo?.biography}</p>
          <div className="mt-4 flex sm:items-center flex-col sm:flex-row sm:space-x-2">
            <p className="text-yellow-500 font-semibold text-lg">
              User Since: {formatDate(reportInfo?.reportedTo?.joinDate)}
            </p>
            {calculateDateDifference(reportInfo?.reportedTo?.joinDate) > 60 && (
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
                  />
                </svg>
                <p className="text-green-600 text-base">Verified</p>
              </div>
            )}
          </div>
          <p className="text-white">Role: {reportInfo?.reportedTo?.role}</p>
        </div>
        <div className=" bg-[#36393e52] shadow-lg rounded-lg mb-4 p-4 sm:p-6 h-full">
          <h3 className="text-md md:text-lg lg:text-xl mb-7 text-white lg:text-start uppercase font-bold">
            Reported By
            <hr className="w-[73px] border-b-4 border-green-300 " />{" "}
          </h3>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={reportInfo?.reportedBy?.image}
              alt={`profile`}
              className="w-16 h-16 rounded-full object-cover  "
            />
            <div>
              <h2 className="text-xl font-semibold">
                {reportInfo?.reportedBy?.displayName}
              </h2>
            </div>
          </div>
          <p className="text-white">Email: {reportInfo?.reportedBy?.email}</p>
          <p className="text-white">Phone: {reportInfo?.reportedBy?.phone}</p>
          <p className="text-white">
            Address: {reportInfo?.reportedBy?.address}
          </p>
          <p className="text-white">{reportInfo?.reportedBy?.biography}</p>
          <div className="mt-4 flex sm:items-center flex-col sm:flex-row sm:space-x-2">
            <p className="text-yellow-500 font-semibold text-lg">
              User Since: {formatDate(reportInfo?.reportedBy?.joinDate)}
            </p>
            {calculateDateDifference(reportInfo?.reportedBy?.joinDate) > 60 && (
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
                  />
                </svg>
                <p className="text-green-600 text-base">Verified</p>
              </div>
            )}
          </div>
          <p className="text-white">Role: {reportInfo?.reportedBy?.role}</p>
        </div>
      </div>
      <div className="w-full">
        <div className=" bg-[#36393e52] shadow-lg rounded-lg mb-4 p-4 sm:p-6 mt-[16px]">
          <p className="text-white text-md md:text-lg lg:text-2xl mb-2">
            <span className="font-bold">Report Reason:</span>{" "}
            {reportInfo?.reportReason}
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white">
                Pickup Location: {reportInfo?.rideInfo?.pickUpLocation}
              </p>
              <p className="text-white">
                Drop Location: {reportInfo?.rideInfo?.dropLocation}
              </p>
            </div>
            <div>
              <p className="text-white">
                Ride Date: {formatDate(reportInfo?.rideInfo?.rideDateTime)}
              </p>
              <p className="text-white">
                Ride Time: {formatTime(reportInfo?.rideInfo?.rideDateTime)}
              </p>
            </div>
          </div>
          <p className=" text-[#FFD700] font-extrabold mt-4 text-base md:text-lg lg:text-xl">
            <span className="font-extrabold text-white">Cost:</span>{" "}
            {reportInfo?.rideInfo?.cost}tk
          </p>
          <button
            className="mt-3 bg-red-400 py-1 px-3 text-gray-800 font-bold rounded hover:bg-red-600"
            onClick={() => removeUser()}
          >
            Remove User
          </button>
        </div>
      </div>
      {otherReports[0] && (
        <div>
          <h3 className="text-lg md:text-xl lg:text-3xl mb-7 text-white lg:text-start uppercase font-bold">
            Other <span className="text-green-300">Reports </span>
            <hr className="w-[73px] border-b-4 border-green-300 " />{" "}
          </h3>
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {otherReports?.map((report) => (
              <div className=" bg-[#36393e52] shadow-lg rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div>
                  <h2 className="text-xl font-semibold">
                    {report?.reportedTo?.displayName}
                  </h2>
                </div>
                <p className="text-white">Email: {report?.reportedTo?.email}</p>
                <p className="text-white">Phone: {report?.reportedTo?.phone}</p>
                <div className="mt-2 flex sm:items-center flex-col sm:flex-row sm:space-x-2">
                  <p className="text-yellow-500 font-semibold text-lg">
                    User Since: {formatDate(report?.reportedTo?.joinDate)}
                  </p>
                  {calculateDateDifference(report?.reportedTo?.joinDate) >
                    60 && (
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
                        />
                      </svg>
                      <p className="text-green-600 text-base">Verified</p>
                    </div>
                  )}
                </div>
                <p className="text-white">Role: {report?.reportedTo?.role}</p>
                <div>
                  <h2 className="text-xl mt-2 font-semibold">
                    Report Reason: {report?.reportReason}
                  </h2>
                </div>
                <div className="w-full mt-3">
                  <Link href={`/dashboard/reported/${report?._id}`}>
                    <button className="btn btn-warning float-right hover:btn-neutral">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetailsIndex;
