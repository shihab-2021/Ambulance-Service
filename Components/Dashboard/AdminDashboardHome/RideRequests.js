import React from "react";

const RideRequests = ({ bookedRides }) => {
  return (
    <>
      <div className=" bg-[#36393e52] shadow-lg rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-white">
              Latest Booked
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Booked Information
            </h3>
          </div>
          <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            12.5%
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg h-52">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-white">
                  <thead className=" bg-[#36393e52]">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Ambulance No
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-[#36393e52]">
                    {bookedRides?.map((bookedRide, i) => {
                      const date = new Date(
                        bookedRide?.patientSide?.rideDateTime
                      );
                      return (
                        <tr
                          className={`${i % 2 && "bg-[#36393e82]"}`}
                          key={bookedRide._id}
                        >
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-white">
                            {bookedRide?.driverSide?.ambulanceNumber}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-white">
                            {date.toDateString()}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-white">
                            {date.toLocaleTimeString()}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-white">
                            {bookedRide?.patientSide?.cost}৳
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RideRequests;
