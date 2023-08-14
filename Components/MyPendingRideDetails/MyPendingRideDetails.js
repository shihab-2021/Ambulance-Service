import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import DialogLayout from "../Shared/Dialog/DialogLayout";
import Loading from "../Shared/Loading/Loading";
import logo from "../../assets/logos/navbar-logo.png";
import Image from "next/image";
import useAuth from "../Context/useAuth";
import swal from "sweetalert";
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const MyPendingRideDetails = () => {
  const { userInfo } = useAuth();
  const router = useRouter();
  const id = router?.query?.id;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://rescue-reach-server.vercel.app/rideBooked/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error.message);
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

  const handleCancelRide = () => {
    if (!userInfo) {
      swal("User information not found! Please reload.", {
        icon: "warning",
      });
      return;
    }

    swal({
      title: "Are you sure?",
      text: "Your profile will be reported because of cancel!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        fetch("https://rescue-reach-server.vercel.app/rideRequest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data?.patientSide,
          }),
        }).then(() => {
          const payload = {
            reportReason: "7- Canceled Pending Ride",
            reportedBy: userInfo,
            reportedTo: userInfo,
            rideInfo: (({ ["requester"]: _, ...rest }) => rest)(
              data?.patientSide
            ),
          };
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
            const url = `https://rescue-reach-server.vercel.app/delete-rideBooked/${data?._id}`;
            fetch(url, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  setIsLoading(false);
                  swal("Ride canceled!", {
                    icon: "success",
                  });
                  router.replace("/");
                }
              });
          });
        });
      }
    });
  };
  return (
    <div className="container mx-auto px-4 font-sansita">
      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white my-20">
        <h3 className="text-xl md:text-2xl lg:text-4xl mb-7  text-white lg:text-start uppercase font-extrabold">
          Pending Ride Details
          <hr className="w-[73px] border-b-4 border-yellow-300 " />{" "}
        </h3>
        <div className=" lg:flex gap-10  justify-center">
          <div className="basis-1/2 md:w-full mb-5">
            <div className="">
              <h2 className="text-xl lg:text-2xl mb-4 font-extrabold break-all">
                Ride: {data?._id}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                <div className=" col-span-5">
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Requester's Name:</span>{" "}
                    {data?.patientSide?.requester?.displayName}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Requester's Phone:</span>{" "}
                    {data?.patientSide?.requester?.phone}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Approver's Name:</span>{" "}
                    {data?.driverSide?.driverInfo?.displayName}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Approver's Phone:</span>{" "}
                    {data?.driverSide?.driverInfo?.phone}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Pickup Location:</span>{" "}
                    {data?.patientSide?.pickUpLocation}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Drop Location:</span>{" "}
                    {data?.patientSide?.dropLocation}
                  </p>
                </div>
                <div className=" col-span-3">
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Case:</span>{" "}
                    {data?.patientSide?.case}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">System:</span>{" "}
                    {data?.patientSide?.system}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Date:</span>{" "}
                    {formatDate(data?.patientSide?.rideDateTime)}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Time:</span>{" "}
                    {formatTime(data?.patientSide?.rideDateTime)}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Ambulance Number:</span>{" "}
                    {data?.driverSide?.ambulanceNumber}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Ambulance Model:</span>{" "}
                    {data?.driverSide?.ambulanceModel}
                  </p>
                </div>
              </div>
              <p className=" text-[#FFD700] font-extrabold mt-4 text-base md:text-lg lg:text-xl">
                <span className="font-extrabold text-white">Cost:</span>{" "}
                {data?.patientSide?.cost}tk
              </p>
              <p className="text-white mt-2 text-sm md:text-base lg:text-lg">
                <span className="font-extrabold">Description:</span>{" "}
                {data?.patientSide?.description || "N/A"}
              </p>
              <div className="mt-6 flex justify-start">
                <button
                  onClick={() => {
                    handleCancelRide();
                  }}
                  className="btn btn-error hover:btn-ghost text-sm md:text-base lg:text-lg"
                >
                  Cancel Ride
                </button>
              </div>
            </div>
          </div>
          <div className="basis-1/2 ">
            {data?._id && <Map data={data?.patientSide} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPendingRideDetails;
