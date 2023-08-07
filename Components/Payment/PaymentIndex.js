import React, { useEffect, useState } from "react";
import useAuth from "../Context/useAuth";
import BookedRidesView from "./BookedRidesView";
import PaymentForm from "./PaymentForm";
import Loading from "../Shared/Loading/Loading";

const PaymentIndex = () => {
  const [selectedRide, setSelectedRide] = useState({});
  const [bookedRides, setBookedRides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userInfo } = useAuth();

  useEffect(() => {
    fetch("https://rescue-reach-server.vercel.app/rideBooked")
      .then((res) => res.json())
      .then((data) => {
        if (userInfo?.role === "Driver") {
          const booked = data?.filter(
            (item) => item?.driverSide?.driverInfo?.email === user?.email
          );
          setBookedRides(booked);
        } else {
          const booked = data?.filter(
            (item) => item?.patientSide?.requester?.email === user?.email
          );
          setBookedRides(booked);
        }
      });
  }, [user, user?.email, userInfo]);
  console.log(selectedRide);
  return (
    <div>
      {isLoading && (
        <div className="absolute w-full h-full">
          <Loading />
        </div>
      )}
      {!userInfo ? (
        <div className=" w-full h-full">
          <Loading />
        </div>
      ) : (
        <div className="px-4 font-sansita my-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-4xl mb-7 text-black lg:text-start uppercase font-bold">
            <span className="text-green-300">Payment </span>System
            <hr className="w-[73px] border-b-4 border-green-300 " />{" "}
          </h3>
          {userInfo?.role === "Driver" ? (
            <div className=" min-h-[35.3vh] ">
              <div>
                <h1 className="text-2xl">
                  Currently you're using driver account where you don't need to
                  pay!
                </h1>
              </div>
            </div>
          ) : (
            <div className="lg:flex gap-10 justify-center">
              <div className="basis-1/2 ">
                <>
                  {bookedRides?.length < 1 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <h1 className="text-2xl">
                        Currently you have no pending ride!
                      </h1>
                      <hr className="w-[100px] mt-2 rounded-full animate-ping border-b-4 border-green-300" />
                    </div>
                  ) : (
                    <>
                      <BookedRidesView
                        bookedRides={bookedRides}
                        setSelectedRide={setSelectedRide}
                        selectedRide={selectedRide}
                      />
                    </>
                  )}
                </>
              </div>
              <div className="basis-1/2">
                <PaymentForm
                  setIsLoading={setIsLoading}
                  selectedRide={selectedRide}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentIndex;
