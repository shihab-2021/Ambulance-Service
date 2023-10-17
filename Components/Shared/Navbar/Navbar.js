import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import logo from "../../../assets/logos/navbar-logo.png";
import PopupImg from "../../../assets/hero-banner.jpg";
import Image from "next/image";
import DialogLayout from "../Dialog/DialogLayout";
import Signup from "../../Signup/Signup";
import Login from "../../Login/Login";
import useAuth from "../../Context/useAuth";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { FaAmbulance } from "react-icons/fa";
// import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [bookedRides, setBookedRides] = useState();
  const { user, logout, userInfo } = useAuth();

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
  const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);

  const openSignupPopup = () => {
    setSignupPopupOpen(true);
  };

  const closeSignupPopup = () => {
    setSignupPopupOpen(false);
    setSelectedUserType(null);
  };

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    openSignupPopup();
  };
  const menu = (
    <>
      <li>
        <Link
          href="/"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-secondary"
        >
          Home
        </Link>
      </li>
      {userInfo && userInfo?.role === "admin" && (
        <li>
          <Link
            href="/dashboard"
            class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-secondary"
          >
            Dashboard
          </Link>
        </li>
      )}
      <li>
        <Link
          href="/aboutUs"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-secondary"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          href="/payment"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-secondary"
        >
          Payment
        </Link>
      </li>
      <li>
        <Link
          href="/ourDrivers"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-secondary"
        >
          Our Drivers
        </Link>
      </li>
    </>
  );
  useEffect(() => {
    if (!signupOpen) setSelectedUserType(null);
  }, [signupOpen]);
  return (
    <div className="shadow-lg sticky font-sansita z-[1] top-0 bg-white">
      <DialogLayout open={loginOpen} setOpen={setLoginOpen}>
        <div className="px-6 py-4">
          <Login setLoginOpen={setLoginOpen} />
        </div>
      </DialogLayout>
      <DialogLayout open={signupOpen} setOpen={setSignupOpen}>
        <div className="px-6 py-4">
          {!selectedUserType ? (
            <>
              <div className="flex items-center">
                <img
                  className="h-[300px] w-[300px] object-cover hidden lg:block "
                  src="https://img.freepik.com/free-vector/modern-emergency-word-concept-with-flat-design_23-2147939665.jpg?w=826&t=st=1690119455~exp=1690120055~hmac=94a035ebd42b342b4a80dace3f76576845e7b6cbebb6921c4d6b68d9d9285221"
                  alt="PopupImg"
                />
                <div>
                  <h2 className="text-[24px] font-extrabold text-center underline mb-6 ">
                    Select User Type
                  </h2>
                  <button
                    onClick={() => handleUserTypeSelect("Driver")}
                    className="btn-select mx-4 bg-indigo-400 text-[18px] font-[700] p-4 rounded-2xl shadow-[0px_6px_0px_0px_#CA5F98]"
                  >
                    Driver
                  </button>
                  <button
                    onClick={() => handleUserTypeSelect("Patient")}
                    className="btn-select mx-4 bg-indigo-400 text-[18px] font-[700] p-4 rounded-2xl shadow-[0px_6px_0px_0px_#CA5F98]"
                  >
                    Patient
                  </button>
                  {/* <button
                    onClick={() => handleUserTypeSelect("Administrator")}
                    className="btn-select mx-4 bg-indigo-400 text-[18px] font-[700] p-4 rounded-2xl shadow-[0px_6px_0px_0px_#CA5F98]"
                  >
                    Administrator
                  </button> */}
                </div>
              </div>
            </>
          ) : (
            <>
              <Signup
                setSignupOpen={setSignupOpen}
                selectedUserType={selectedUserType}
              />
            </>
          )}
        </div>
      </DialogLayout>
      <div class="px-4 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
        <div class="relative flex items-center justify-between">
          <Link
            href="/"
            aria-label="Ambulace Services"
            title="Ambulace Services"
            class="inline-flex items-center"
          >
            <Image src={logo} className="w-32 h-full"></Image>
          </Link>
          <ul class=" items-center hidden space-x-8 lg:flex">{menu}</ul>
          <ul class=" items-center hidden space-x-8 lg:flex">
            {user?.email && (
              <Link href="/myRides">
                <Badge badgeContent={bookedRides?.length} color="success">
                  <FaAmbulance className="text-[26px]" color="#CC1C1C" />
                </Badge>
              </Link>
            )}
            {user?.email && (
              <div className="group relative inline-block">
                <button className="link-item">
                  <a className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5 inline-flex items-center">
                    <span className="mr-1 pr-4">
                      <img
                        style={{ height: "40px", width: "40px" }}
                        className="link-item inline-flex items-center rounded-full object-cover"
                        src={
                          userInfo?.image
                            ? userInfo?.image
                            : `https://i.ibb.co/DMYmT3x/Generic-Profile.jpg`
                        }
                        alt=""
                      />
                    </span>
                    <span className="h-4 w-1 fill-current"></span>
                  </a>
                </button>
                <ul className="absolute hidden pt-1 text-gray-700 group-hover:block">
                  <li className="">
                    <Link href={`/user/${userInfo?._id}`}>
                      <p className="whitespace-no-wrap block rounded-t bg-gray-200 py-2 px-4 hover:bg-gray-400">
                        My Profile
                      </p>
                    </Link>
                  </li>
                  <li className="">
                    <p
                      onClick={() => logout()}
                      className="whitespace-no-wrap block rounded-b bg-gray-200 py-2 px-4 hover:bg-gray-400 cursor-pointer"
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            )}
            {!user?.email && (
              <li>
                <button
                  onClick={() => setLoginOpen(true)}
                  class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none mr-4 btn bg-slate-600 text-white hover:text-black hover:bg-red-300"
                  aria-label="Login"
                  title="Login"
                >
                  Log In
                </button>
                <button
                  onClick={() => setSignupOpen(true)}
                  class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary hover:bg-gray-400 focus:shadow-outline focus:outline-none"
                  aria-label="Login"
                  title="Signup"
                >
                  Signup
                </button>
              </li>
            )}
          </ul>
          <div class="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div class="absolute top-0 left-0 w-full">
                <div class="p-5 bg-white border rounded shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Ambulace Services"
                        title="Ambulace Services"
                        class="inline-flex items-center"
                      >
                        <Image src={logo} className="w-44 h-full"></Image>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul class="space-y-4">
                      {menu}
                      <li>
                        <a
                          href="/"
                          class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary hover:bg-secondary focus:shadow-outline focus:outline-none"
                          aria-label="Login"
                          title="Login"
                        >
                          Log In
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
