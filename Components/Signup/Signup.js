import React from "react";
import useAuth from "../Context/useAuth";
import logo from "../../assets/logos/navbar-logo.png";
import Image from "next/image";
import Loading from "../Shared/Loading/Loading";
import swal from "sweetalert";

const Signup = ({ selectedUserType, setSignupOpen }) => {
  const { user, createUser, isLoading } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;
    const phone = form.phone.value;
    if (password !== confirm_password) {
      swal("Please enter your password correctly!", {
        icon: "warning",
      });
      return;
    }

    const userData = {
      email,
      displayName,
      address,
      image: "https://i.ibb.co/DMYmT3x/Generic-Profile.jpg",
      role: selectedUserType,
      address: address,
      phone: phone,
      biography: "",
      gender: "",
      profession: "",
      birthDate: "",
      joinDate: new Date(),
    };

    createUser(email, password, userData);
    setSignupOpen(false);
  };
  return (
    <div>
      {isLoading && (
        <div className="absolute left-[48%] top-[30%] z-10">
          <Loading />
        </div>
      )}
      <div className="flex my-10 w-full items-center justify-center">
        <div className="rounded-xl px-10 backdrop-blur-md max-sm:px-8">
          <div className="text-white font-sansita">
            <div className="mb-8 flex flex-col items-center">
              {/* <img src={logo} width="150" alt="" srcset="" /> */}
              <Image src={logo} className="w-32 h-full"></Image>
              {/* <h1 className="mb-2 text-2xl">Universal Hostel</h1> */}
              <span className="text-gray-500 text-[20px] font-[700] mt-4">
                Signup as {selectedUserType}
              </span>
            </div>
            <form style={{ minWidth: "300px" }} onSubmit={handleSubmit}>
              <div className="">
                <label className="block text-sm text-black" for="email">
                  E-mail
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  aria-label="email"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-black">Name</label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                  type="text"
                  id="name"
                  placeholder="Name"
                  arial-label="name"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-black">Phone Number</label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                  type="text"
                  id="phone"
                  placeholder="Phone Number"
                  arial-label="phone"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-black">Address</label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                  type="text"
                  id="address"
                  placeholder="Address"
                  arial-label="address"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block  text-sm text-black">Password</label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                  type="password"
                  id="password"
                  placeholder="Password"
                  arial-label="password"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block  text-sm text-black">
                  Confirm Password
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                  type="password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  arial-label="confirm_password"
                  required
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl uppercase bg-green-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-green-600"
                >
                  signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
