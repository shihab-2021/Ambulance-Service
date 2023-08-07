import React from "react";

const BookedRidesView = ({ bookedRides, setSelectedRide, selectedRide }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(dateString).toLocaleTimeString("en-US", options);
  };
  return (
    <div className="h-full">
      {!selectedRide?._id ? (
        <div className=" ">
          <h1 className="text-2xl">Please select which ride you want to pay</h1>
          <div className="mt-[20px]">
            {bookedRides?.map((request) => (
              <div className="p-6 mt-[20px] rounded-lg shadow-xl bg-gradient-to-r from-[#2dd4bf69] to-[#3b82f647]    border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <div className="flex items-center justify-between mb-4">
                  <h2 className=" text-lg lg:text-2xl break-all font-bold">
                    Ride: {request?._id}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">
                        Pickup Location:
                      </span>{" "}
                      {request?.patientSide?.pickUpLocation}
                    </div>
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">
                        Drop Location:
                      </span>{" "}
                      {request?.patientSide?.dropLocation}
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">Date:</span>{" "}
                      {formatDate(request?.patientSide?.rideDateTime)}
                    </div>
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">Time:</span>{" "}
                      {formatTime(request?.patientSide?.rideDateTime)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center sm:justify-end space-x-4">
                  <button
                    onClick={() => setSelectedRide(request)}
                    className="btn btn-success hover:btn-ghost text-xl hover:text-white"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 h-full rounded-lg shadow-xl bg-gradient-to-r from-teal-400 to-blue-500 text-white  border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div>
            <h3 className="text-xl md:text-2xl lg:text-4xl mb-7  text-white lg:text-start uppercase font-extrabold">
              Selected Ride Details
              <hr className="w-[73px] border-b-4 border-yellow-300 " />{" "}
            </h3>
            <div>
              <div className="">
                <h2 className="text-xl lg:text-2xl mb-4 font-extrabold break-all">
                  Ride: {selectedRide?._id}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                  <div className=" col-span-5">
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">Driver's Name:</span>{" "}
                      {selectedRide?.driverSide?.driverInfo?.displayName}
                    </p>
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">Driver's Phone:</span>{" "}
                      {selectedRide?.driverSide?.driverInfo?.phone}
                    </p>
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">Pickup Location:</span>{" "}
                      {selectedRide?.patientSide?.pickUpLocation}
                    </p>
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">Drop Location:</span>{" "}
                      {selectedRide?.patientSide?.dropLocation}
                    </p>
                  </div>
                  <div className=" col-span-3">
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">Case:</span>{" "}
                      {selectedRide?.patientSide?.case}
                    </p>
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">System:</span>{" "}
                      {selectedRide?.patientSide?.system}
                    </p>
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">Date:</span>{" "}
                      {formatDate(selectedRide?.patientSide?.rideDateTime)}
                    </p>
                    <p className="text-white text-sm md:text-base lg:text-lg">
                      <span className="font-extrabold">Time:</span>{" "}
                      {formatTime(selectedRide?.patientSide?.rideDateTime)}
                    </p>
                  </div>
                </div>
                <p className=" text-[#FFD700] font-extrabold mt-4 text-base md:text-lg lg:text-xl">
                  <span className="font-extrabold text-white">Cost:</span>{" "}
                  {selectedRide?.patientSide?.cost}tk
                </p>
                <p className="text-white mt-2 text-sm md:text-base lg:text-lg">
                  <span className="font-extrabold">Ambulance Number:</span>{" "}
                  {selectedRide?.driverSide?.ambulanceNumber || "N/A"}
                </p>
                <p className="text-white  text-sm md:text-base lg:text-lg">
                  <span className="font-extrabold">Ambulance Model:</span>{" "}
                  {selectedRide?.driverSide?.ambulanceModel || "N/A"}
                </p>
                <div className="mt-6 flex justify-start">
                  <button
                    onClick={() => {
                      setSelectedRide({});
                    }}
                    className="btn btn-error hover:btn-ghost text-sm md:text-base lg:text-lg"
                  >
                    Remove Selection
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default BookedRidesView;
