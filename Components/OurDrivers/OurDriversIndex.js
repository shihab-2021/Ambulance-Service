import React, { useEffect, useState } from "react";
import Loading from "../Shared/Loading/Loading";
import DriverInfoCard from "./DriverInfoCard";

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
              <DriverInfoCard
                driver={driver}
                formatDate={formatDate}
                calculateDateDifference={calculateDateDifference}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurDriversIndex;
