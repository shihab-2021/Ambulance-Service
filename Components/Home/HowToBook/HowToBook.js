import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Map from "../Map/Map";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../Map/Map"), {
  ssr: false,
});
// const MapWithDirections = dynamic(() => import("../Map/Map"), {
//   ssr: false,
// });
const apikey = "AIzaSyBN1gauK2nrHna23I7pRWqpp0ORgxJ6Yjc";
const HowToBook = () => {
  return (
    <div className="p-10 font-sansita my-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg">
      <div>
        <h3 className="text-xl md:text-2xl lg:text-4xl my-7  text-white lg:text-start uppercase font-bold">
          How to work <span className="text-yellow-300">Rescue Reach?</span>
          <hr className="w-[73px] border-b-4 border-yellow-300 " />{" "}
        </h3>
      </div>
      <div className="lg:flex gap-10 items-center justify-center">
        <div className="basis-1/2 ">
          <Link href="/book">
            <button className="btn btn-success hover:btn-ghost text-xl hover:text-white w-full h-20">
              How to Book Option
            </button>
          </Link>
          <Link href="/locationTrack">
            <button className="btn btn-secondary hover:btn-ghost text-xl hover:text-white w-full h-20 my-4 text-black">
              location track in nearest areas
            </button>
          </Link>
          <Link href="/payment">
            <button className="btn btn-warning hover:btn-ghost text-xl hover:text-white w-full h-20 my-4 text-black">
              payment system
            </button>
          </Link>
          <Link href="/ourDrivers">
            <button className="btn btn-error hover:btn-ghost text-xl hover:text-white w-full h-20 my-4 text-black">
              our drivers
            </button>
          </Link>
        </div>
        <div className="basis-1/2">
          {/* <div>
            <h4 className="lg:text-2xl text-xl mb-3 text-center lg:text-start    uppercase font-bold">
              Some Content Will be come here
            </h4>
          </div> */}
          <div className="rounded-lg">
            <Map />
            {/* <MapWithDirections /> */}
            {/* <img
              src="https://heera.it/wp-content/uploads/2011/11/google-maps-new-interface1.jpg"
              alt=""
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBook;
