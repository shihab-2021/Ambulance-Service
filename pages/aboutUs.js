import React from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";

const aboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 font-sansita">
        <section className="bg-gradient-to-r from-gray-400 to-red-400 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Explore Our Visionary Ride-Sharing Journey
            </h1>
            <p className="text-xl mb-12">
              Elevating your travel experience with innovation, trust, and
              community-driven ride-sharing solutions.
            </p>
            <button className="bg-white text-red-500 hover:bg-red-500 hover:text-white py-3 px-8 rounded-full transition duration-300 ease-in-out focus:outline-none">
              Discover More
            </button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-10">
              Our Mission and Values
              <hr className="w-[100px] mx-auto mt-2 border-b-4 rounded-full border-red-300 " />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-8 border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4">Safety First</h3>
                <p className="text-gray-700">
                  Your safety is paramount. We're committed to ensuring secure
                  and dependable journeys for everyone.
                </p>
              </div>
              <div className="p-8 border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4">
                  Connected Community
                </h3>
                <p className="text-gray-700">
                  Building a network of shared rides that fosters connections,
                  creating a close-knit and dynamic community.
                </p>
              </div>
              <div className="p-8 border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4">
                  Sustainability Drive
                </h3>
                <p className="text-gray-700">
                  Join us in reducing environmental impact. Our sustainable
                  ride-sharing choices are helping create greener cities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-200 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-10">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Tahjid Islam Tushar
                  </h3>
                  <p className="text-gray-700">CEO & Co-Founder</p>
                  <p className="text-gray-600 mt-2">
                    A visionary leader with a passion for creating exceptional
                    travel experiences.
                  </p>
                </div>
              </div>
              <div className="border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Atia Ibnat</h3>
                  <p className="text-gray-700">CTO & Co-Founder</p>
                  <p className="text-gray-600 mt-2">
                    Technical genius driving innovation to enhance your
                    ride-sharing experience.
                  </p>
                </div>
              </div>
              <div className="border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Puja Karmokar</h3>
                  <p className="text-gray-700">Head of Design</p>
                  <p className="text-gray-600 mt-2">
                    Design enthusiast crafting user-centric interfaces that set
                    us apart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default aboutUs;
