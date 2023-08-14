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

const RideRequestDetailsMain = () => {
  const { userInfo } = useAuth();
  const router = useRouter();
  const id = router?.query?.id;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://rescue-reach-server.vercel.app/rideRequest/${id}`)
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
  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const ambulanceNumber = form.ambulanceNumber.value;
    const ambulanceModel = form.ambulanceModel.value;

    if (!userInfo) {
      swal("User information not found! Please reload.", {
        icon: "warning",
      });
      return;
    }

    if (!ambulanceNumber || !ambulanceModel) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter Ambulance Number and Ambulance Model!",
      });
      return;
    }

    const patientSide = data;
    delete patientSide._id;
    const driverSide = {
      driverInfo: userInfo,
      ambulanceNumber: ambulanceNumber,
      ambulanceModel: ambulanceModel,
    };
    console.log(patientSide, driverSide);

    swal({
      title: "Are you sure?",
      text: "If you are not able to complete the ride your profile will be reported!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("https://rescue-reach-server.vercel.app/rideBooked", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientSide: patientSide,
            driverSide: driverSide,
          }),
        }).then(() => {
          const url = `https://rescue-reach-server.vercel.app/delete-rideRequest/${id}`;
          fetch(url, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                setIsLoading(false);
                setOpenSubmitDialog(false);
                swal("Ride booked successfully!", {
                  icon: "success",
                });
                router.replace("/");
              }
            });
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 font-sansita">
      <DialogLayout open={openSubmitDialog} setOpen={setOpenSubmitDialog}>
        <div className="px-6 py-4">
          <div>
            <div className="flex w-full items-center justify-center">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="rounded-xl px-10 py-10  backdrop-blur-md max-sm:px-8">
                  <div className="text-white font-sansita">
                    <div className="mb-8 flex flex-col items-center">
                      <Image src={logo} className="w-32 h-full"></Image>
                      <span className="text-gray-500 mt-4">
                        Enter Your Ambulance Information
                      </span>
                    </div>
                    <form onSubmit={handleSubmit} style={{ minWidth: "300px" }}>
                      <div className="">
                        <label className="block text-sm text-black" for="email">
                          Ambulance Number
                        </label>
                        <input
                          className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-gray-200"
                          type="text"
                          name="ambulanceNumber"
                          id="ambulanceNumber"
                          placeholder="Ambulance Number"
                          aria-label="ambulanceNumber"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <label className="block  text-sm text-black">
                          Ambulance Model
                        </label>
                        <input
                          className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-gray-200"
                          type="text"
                          name="ambulanceModel"
                          id="ambulanceModel"
                          placeholder="Ambulance Model"
                          arial-label="ambulanceModel"
                          required
                        />
                      </div>
                      <div className="mt-8 flex justify-center text-lg text-black">
                        <button
                          type="submit"
                          className="rounded-3xl uppercase bg-green-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-green-600"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogLayout>
      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white my-20">
        <h3 className="text-xl md:text-2xl lg:text-4xl mb-7  text-white lg:text-start uppercase font-extrabold">
          Ride Request Details
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
                    {data?.requester?.displayName}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Requester's Phone:</span>{" "}
                    {data?.requester?.phone}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Pickup Location:</span>{" "}
                    {data?.pickUpLocation}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Drop Location:</span>{" "}
                    {data?.dropLocation}
                  </p>
                </div>
                <div className=" col-span-3">
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Case:</span> {data?.case}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">System:</span>{" "}
                    {data?.system}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Date:</span>{" "}
                    {formatDate(data?.rideDateTime)}
                  </p>
                  <p className="text-white text-sm md:text-base lg:text-lg">
                    <span className="font-extrabold">Time:</span>{" "}
                    {formatTime(data?.rideDateTime)}
                  </p>
                </div>
              </div>
              <p className=" text-[#FFD700] font-extrabold mt-4 text-base md:text-lg lg:text-xl">
                <span className="font-extrabold text-white">Cost:</span>{" "}
                {data?.cost}tk
              </p>
              <p className="text-white mt-2 text-sm md:text-base lg:text-lg">
                <span className="font-extrabold">Description:</span>{" "}
                {data?.description || "N/A"}
              </p>
              <div className="mt-6 flex justify-start">
                {userInfo?.role === "Driver" && (
                  <button
                    onClick={() => {
                      setOpenSubmitDialog(true);
                    }}
                    className="btn btn-primary hover:btn-ghost text-sm md:text-base lg:text-lg"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="basis-1/2 ">{data?._id && <Map data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

export default RideRequestDetailsMain;
