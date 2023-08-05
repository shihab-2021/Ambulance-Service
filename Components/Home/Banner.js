import Image from "next/image";
import banner from "../../assets/banner.jpg";
import useAuth from "../Context/useAuth";
import { FaAmbulance } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loading from "../Shared/Loading/Loading";

const Banner = () => {
  const { user, userInfo } = useAuth();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   fetch(
  //     `https://rescue-reach-server.vercel.app/emergency-rider/${user?.email}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }, [user?.email]);

  // const handleAddEmergency = () => {
  //   setIsLoading(true);
  //   fetch("https://rescue-reach-server.vercel.app/emergency", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       ...userInfo,
  //     }),
  //   }).then(() => {
  //     setData(userInfo);
  //     setIsLoading(false);
  //   });
  // };

  // const handleRemoveEmergency = () => {
  //   const proceed = window.confirm(
  //     "Are you sure, you want to delete?",
  //     user?.email
  //   );
  //   if (proceed) {
  //     setIsLoading(true);
  //     const url = `https://rescue-reach-server.vercel.app/delete-emergency/${user?.email}`;
  //     fetch(url, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.deletedCount > 0) {
  //           alert("Removed Successfully!");
  //           setData(null);
  //           setIsLoading(false);
  //         }
  //       });
  //   }
  // };
  return (
    <div>
      <div className="mt-3">
        <Image
          src={banner}
          className="w-full h-[40vh] lg:h-full rounded-2xl shadow-md shadow-primary-focus"
        />
      </div>
      <div className="my-5 lg:my-10 text-center font-sansita">
        <h3 className="text-2xl md:text-3xl lg:text-5xl/[50px]  text-gray-900 font-bold uppercase">
          Getting You out of hurdle is <br /> our responsibility
        </h3>
        <p className="text-sm md:text-xl font-normal my-3">
          You don't need to find us we will find you
        </p>
      </div>
      {/* {userInfo?.role === "Driver" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className=" text-center text-yellow-500 text-[25px] font-[700] ">
            If your available for emergency ride please click on the{" "}
            <span className="text-[#FF557A] animate-pulse">
              "Available for emergency"
            </span>{" "}
            button!
          </h1>
          {isLoading && <Loading />}
          {data?.email ? (
            <button
              onClick={() => handleRemoveEmergency()}
              class="border my-[30px] border-[#FF557A] text-[#FF557A] text-[20px] font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#FF557A] hover:bg-[#FF557A] hover:text-white flex items-center gap-[10px]"
            >
              Remove from Emergency
            </button>
          ) : (
            <button
              onClick={() => handleAddEmergency()}
              class="border my-[30px] border-[#FF557A] text-[#FF557A] text-[20px] font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#FF557A] hover:bg-[#FF557A] hover:text-white flex items-center gap-[10px]"
            >
              Available for Emergency{" "}
              <FaAmbulance className=" animate-bounce " />
            </button>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Banner;
