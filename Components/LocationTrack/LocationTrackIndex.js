import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const LocationTrackIndex = () => {
  const places = [
    "Banani",
    "Evercare Hospital Dhaka",
    "World University of Bangladesh",
    "Mirpur General Hospital & Diagnostic Centre",
    "Radical Hospitals Ltd.",
    "Mirpur-1",
    "Mirpur-2",
    "Mirpur 11",
    "Uttara Sector-5",
  ];
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDropdown, setPickUpDropdown] = useState(false);
  const [rideRequests, setRideRequests] = useState([]);
  const [filteredRideRequests, setFilteredRideRequests] =
    useState(rideRequests);

  useEffect(() => {
    fetch(`https://rescue-reach-server.vercel.app/rideRequest`)
      .then((res) => res.json())
      .then((data) => {
        setRideRequests(data);
        setFilteredRideRequests(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  console.log(rideRequests);

  const handlePickUpInputChange = (event) => {
    setPickUpLocation(event.target.value);
  };

  const handlePickUpSelectPlace = (place) => {
    setPickUpLocation(place);
    setPickUpDropdown(false);
    const placeWiseLocations = rideRequests.filter(
      (td) => td?.pickUpLocation === place || td?.dropLocation === place
    );
    setFilteredRideRequests(placeWiseLocations);
  };
  return (
    <div className="px-4 font-sansita my-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
      <h3 className="text-xl md:text-2xl lg:text-4xl mb-7 text-black lg:text-start uppercase font-bold">
        location track in <span className="text-red-400">nearest </span> areas
        <hr className="w-[73px] border-b-4 border-red-400 " />{" "}
      </h3>
      <div className="lg:flex gap-10 justify-center">
        <div className="basis-1/2 ">
          <div className="relative">
            <input
              className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="text"
              value={pickUpLocation}
              onChange={handlePickUpInputChange}
              onFocus={() => setPickUpDropdown(true)}
              onBlur={() => handlePickUpSelectPlace(pickUpLocation)}
              placeholder="Type a place..."
            />
            {pickUpDropdown && (
              <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                {places
                  ?.filter((place) =>
                    place
                      ?.toLowerCase()
                      ?.includes(pickUpLocation?.toLowerCase())
                  )
                  .map((place, index) => (
                    <div
                      key={index}
                      className={` px-4 py-2 cursor-pointer hover:bg-gray-100`}
                      onMouseDown={() => handlePickUpSelectPlace(place)}
                    >
                      {place}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <small>
            Type place name to find the ride according to your location
          </small>
          <div className="mt-[20px]">
            {filteredRideRequests?.map((request) => (
              <div className="p-6 mt-[20px] rounded-lg shadow-xl bg-gradient-to-r from-gray-100 to-gray-200    border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
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
                      {request.pickUpLocation}
                    </div>
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">
                        Drop Location:
                      </span>{" "}
                      {request.dropLocation}
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">Case:</span>{" "}
                      {request.case}
                    </div>
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold text-gray-900">
                        System:
                      </span>{" "}
                      {request.system}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center sm:justify-end space-x-4">
                  <Link href={`/rideRequest/${request?._id}`}>
                    <button className="btn bg-red-400 hover:btn-ghost text-xl hover:text-white">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="basis-1/2 ">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default LocationTrackIndex;
