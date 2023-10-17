import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";

const DriverInfoCard = ({ driver, formatDate, calculateDateDifference }) => {
  const [rate, setRate] = useState();
  useEffect(() => {
    let totalRating = 0;
    driver?.rating?.forEach((element) => {
      totalRating += element?.rating;
    });
    setRate(totalRating / driver?.rating?.length);
  }, [driver]);
  // console.log(rate);
  return (
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
          <h2 className="text-xl font-semibold">{driver?.displayName}</h2>
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
      <Rating
        name="half-rating-read"
        value={`${rate}`}
        style={{ color: "red" }}
        precision={0.5}
        readOnly
      />
    </div>
  );
};

export default DriverInfoCard;
