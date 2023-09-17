import Image from "next/image";
import banner from "../../assets/banner.jpg";
import BannerBD from "../../assets/bannerBD.jpg";
import Ambulance1 from "../../assets/ambulance1.png";
import Ambulance2 from "../../assets/ambulance2.jpg";
import Ambulance3 from "../../assets/ambulance3.jpg";

const Banner = () => {
  return (
    <div>
      <div className="mt-3">
        <Image
          src={BannerBD}
          className="w-full h-[40vh] lg:h-full rounded-2xl shadow-md shadow-red-400"
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
    </div>
  );
};

export default Banner;
