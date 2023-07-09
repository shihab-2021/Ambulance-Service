import Link from "next/link";
import React from "react";

const HowToBook = () => {
  return (
    <div className="mb-10">
      <div>
        <h3 className="lg:text-3xl text-xl my-7 text-center lg:text-start uppercase font-bold">
          How to work <span className="text-primary">Rescue Reach?</span>
          <hr className="w-[73px] border-b-4 border-primary " />
        </h3>
      </div>
      <div className="">
        <div className="lg:flex gap-16 items-center justify-center">
          <div className="basis-1/2 ">
            <Link href="/book">
              {" "}
              <button className="btn btn-primary w-full h-20">
                How to Book Option
              </button>
            </Link>

            <button className="btn btn-secondary w-full h-20 my-4 text-black">
              Second Option -2
            </button>

            <button className="btn btn-warning w-full h-20 my-4 text-black">
              Third Option -3
            </button>
            <button className="btn btn-error w-full h-20 my-4 text-black">
              Forth Option -4
            </button>
          </div>
          <div className="basis-1/2">
            <div>
              <h4 className="lg:text-2xl text-xl mb-3 text-center lg:text-start uppercase font-bold">
                Some Content Will be come here
              </h4>
            </div>
            <div>
              <img
                src="https://heera.it/wp-content/uploads/2011/11/google-maps-new-interface1.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBook;
