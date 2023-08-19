/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const LatestUsers = ({ users }) => {
  return (
    <>
      <div className=" bg-[#36393e52] shadow-lg rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold leading-none text-white">
            Latest Users
          </h3>
          <Link
            href="/dashboard/manage-user"
            className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
          >
            View all
          </Link>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 h-72 overflow-auto"
          >
            {users?.map((user) => (
              <li key={user?._id} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user?.image}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      <a
                        href="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail="17727a767e7b57607e7973646372653974787a"
                      >
                        {/* [email&#160;protected] */}
                        {user?.email}
                      </a>
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-white pr-1  ">
                    {user?.phone}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LatestUsers;
