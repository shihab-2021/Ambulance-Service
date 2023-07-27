/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCommentDetail, BiHeart } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { ImFlag } from "react-icons/im";
import useAuth from "../../Context/useAuth";

const UserInfo = (props) => {
  const { user } = useAuth();

  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://rescue-reach-server.vercel.app/users-data/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [user?.email]);
  function formatDate(inputDate) {
    if (inputDate) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const [year, month, day] = inputDate?.split("-");
      const monthName = months[Number(month) - 1];

      return `${monthName} ${day}, ${year}`;
    }
  }
  function formatJoinDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }
  const date = formatDate(props?.data?.birthDate);
  const joinDate = formatJoinDate(props?.data?.joinDate);
  return (
    <div>
      <div className="container px-4 mx-auto">
        <div className="bg-gray-100 ">
          <div className="my-5 p-5">
            <div className="grid grid-cols-12 gap-4">
              {/* <!-- Left Side Start --> */}
              <div className="col-span-12 w-full lg:col-span-4">
                {/* <!-- Profile Card --> */}
                <div className="border-t-4 border-green-400 rounded-lg bg-white p-3 ">
                  <div
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                    className="image mx-auto overflow-hidden rounded-lg border-2"
                  >
                    <img className="w-full" src={props?.data?.image} alt="" />
                  </div>
                  <h1 className="my-1 text-center text-2xl font-bold leading-8 text-gray-900 ">
                    {props?.data?.displayName}
                  </h1>
                  <h3 className=" text-semibold text-center text-gray-600 ">
                    {props?.data?.role}
                  </h3>
                  <p className="pt-2 text-sm leading-6 text-gray-500 hover:text-gray-600 text-justify">
                    {props?.data?.biography}
                  </p>
                  {props?.data?.email === data?.email && (
                    <div className="w-100 flex justify-center">
                      <Link href="/giveInfo">
                        <p className="border border-teal-400 p-2 my-5 rounded">
                          Update Profile
                        </p>
                      </Link>
                    </div>
                  )}
                  <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm ">
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">{joinDate}</span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
              </div>
              {/* <!-- Left Side End --> */}
              {/* <!-- Right Side Start --> */}
              <div className="col-span-12 mb-6 w-full lg:col-span-8">
                {/* <!-- Profile tab --> */}
                {/* <!-- About Section --> */}
                <div className="rounded-sm bg-white p-3 shadow-sm ">
                  <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className=" tracking-wide">About</span>
                  </div>
                  <div className="text-gray-700 ">
                    <div className="grid text-base md:grid-cols-2">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Gender
                        </div>
                        <div className="col-span-8 break-words py-2 ">
                          {props?.data?.gender}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Address
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {props?.data?.address}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Phone
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {props?.data?.phone}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Email
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {props?.data?.email}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Birth Date
                        </div>
                        <div className="col-span-8 break-words py-2">
                          {date != "Invalid Date" && date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End of about section --> */}
                {/* <!-- End of profile tab --> */}
              </div>
              {/* <!-- Right Side End --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
