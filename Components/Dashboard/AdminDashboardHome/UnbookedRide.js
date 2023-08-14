import React from "react";
import Link from "next/link";

const UnbookedRide = ({ rideRequests }) => {
  console.log(rideRequests);
  return (
    <>
      <div className=" bg-[#36393e52] shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Unbooked Rides
            </h3>
            <span className="text-base font-normal text-gray-500">
              This is a list of available ride
            </span>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/locationTrack"
              className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
            >
              View all
            </Link>
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
                        Requester
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
                    </tr>
                  </thead>
                  <tbody className=" bg-[#36393e52]">
                    {rideRequests?.map((ride, i) => {
                      const date = new Date(ride?.rideDateTime);
                      return (
                        <tr
                          className={`${i % 2 && "bg-[#36393e82]"}`}
                          key={ride?._id}
                        >
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-white">
                            {ride?.requester?.displayName}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-white">
                            {date?.toDateString()}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-white">
                            {date?.toLocaleTimeString()}
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

export default UnbookedRide;
