import React from "react";

const OurTeam = () => {
  return (
    <div className="">
      <section className="mt-16 py-16">
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
                  Design enthusiast crafting user-centric interfaces that set us
                  apart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
