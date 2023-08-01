/* eslint-disable @next/next/no-img-element */
import { Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";

const Error = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center ">
        <div>
          <img
            className="w-fit animate-bounce "
            src="https://i.ibb.co/W0TtYNX/Pu-Xip-AW3-AXUz-UJ4u-Yyx-PKC-1200-80-removebg-preview.png"
            alt=""
          />
          <div className="w-full shadow-lg p-[6px] mt-[-25px]  "></div>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <h1 className="text-[30px] font-extrabold font-sans  ">
            Aww... The page not found!
          </h1>
          <h1 className="text-[20px] font-bold animate-pulse ">
            Please go to valid route.
          </h1>
          <Link href="/">
            <p className="w-fit bg-blue-400 text-[20px] font-bold py-[10px] rounded-md px-[20px] my-4 ">
              Back to Home
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
