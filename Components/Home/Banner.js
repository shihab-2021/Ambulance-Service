import Image from "next/image";
import banner from "../../assets/banner.jpg";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";

const Banner = () => {
  const { test } = useContext(AuthContext);
  console.log(test);
  return (
    <div>
      <div className="mt-3">
        <Image
          src={banner}
          className="w-full h-[40vh] lg:h-full rounded-2xl shadow-md shadow-primary-focus"
        />
      </div>
      <div className="my-5 lg:my-10 text-center">
        <h3 className="text-2xl md:text-3xl lg:text-5xl/[50px]  text-gray-900 font-bold uppercase">
          Getting you out of hurdle is <br /> our responsibility!
        </h3>
        <p className="text-sm md:text-xl font-normal my-3">
          You don't need to find us we will find you.
        </p>
      </div>
    </div>
  );
};

export default Banner;
