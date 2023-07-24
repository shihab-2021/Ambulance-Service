import React from "react";
import Link from "next/link";
import useAuth from "../Context/useAuth";
import logo from "../../assets/logos/navbar-logo.png";
import Image from "next/image";
import Loading from "../Shared/Loading/Loading";

const Login = () => {
  const { loginUser, user, logout, isLoading } = useAuth();
  const userInfo = user;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password);
    form.reset();
  };
  return (
    <div>
      <div className="flex w-full items-center justify-center">
        {isLoading && <Loading />}
        <div className="rounded-xl px-10 py-10  backdrop-blur-md max-sm:px-8">
          <div className="text-white font-sansita">
            <div className="mb-8 flex flex-col items-center">
              <Image src={logo} className="w-32 h-full"></Image>
              <span className="text-gray-500 mt-4">Enter Login Details</span>
            </div>
            <form onSubmit={handleSubmit} style={{ minWidth: "300px" }}>
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
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl uppercase bg-green-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-green-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
