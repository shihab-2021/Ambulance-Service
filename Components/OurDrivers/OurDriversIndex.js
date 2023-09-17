import React, { useEffect, useState } from "react";
import Loading from "../Shared/Loading/Loading";

const OurDriversIndex = ({ driver }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    fetch("https://rescue-reach-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const allDriver = data?.filter((item) => item?.role === "Driver");
        setDrivers(allDriver);
      });
  }, [drivers]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
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
  return (
    <div>
      {isLoading && (
        <div className="absolute w-full h-full">
          <Loading />
        </div>
      )}
      <div className="px-4 min-h-[50vh] font-sansita my-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
        <h3 className="text-xl md:text-2xl lg:text-4xl mb-7 text-black lg:text-start uppercase font-bold">
          Our<span className="text-red-400"> Drivers</span>
          <hr className="w-[73px] border-b-4 border-red-400 " />{" "}
        </h3>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
            {drivers?.map((driver) => (
              <div
                key={driver.id}
                className="bg-white rounded-lg border shadow-lg hover:shadow-xl transition duration-300 p-6 overflow-hidden transform hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={driver?.image}
                    alt={`profile`}
                    className="w-16 h-16 rounded-full object-cover  "
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {driver?.displayName}
                    </h2>
                  </div>
                </div>
                <p className="text-gray-800">Email: {driver?.email}</p>
                <p className="text-gray-600">Phone: {driver?.phone}</p>
                <p className="text-gray-600">Address: {driver?.address}</p>
                <p className="text-gray-600">{driver?.biography}</p>
                <div className="mt-4 flex sm:items-center flex-col sm:flex-row sm:space-x-2">
                  <p className="text-red-500 font-semibold text-lg">
                    Driving since: {formatDate(driver?.joinDate)}
                  </p>
                  {calculateDateDifference(driver?.joinDate) > 60 && (
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurDriversIndex;
