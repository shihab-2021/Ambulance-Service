import React from "react";
import {
  FaUserAlt,
  FaAmbulance,
  FaCheck,
  FaMedkit,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const HowToUseSection = () => {
  const steps = [
    {
      title: "Step 1: Sign Up or Log In",
      description:
        "If you are a new user, sign up for an account. If you already have an account, log in to get started. We will keep your information secure and protected.",
      icon: <FaUserAlt className="text-5xl text-blue-600" />,
    },
    {
      title: "Step 2: Request an Ambulance",
      description:
        'Click on the "Request Ambulance" button and provide your current location and destination. Our platform will match you with the nearest available ambulance.',
      icon: <FaAmbulance className="text-5xl text-blue-600" />,
    },
    {
      title: "Step 3: Confirm Your Ride",
      description:
        "Once your ride request is submitted, our team will confirm the ride and provide you with the details, including the estimated time of arrival (ETA).",
      icon: <FaCheck className="text-5xl text-blue-600" />,
    },
    {
      title: "Step 4: Ride Safely",
      description:
        "Our experienced drivers and trained medical team will ensure a safe and comfortable journey to your destination. We prioritize your well-being.",
      icon: <FaMedkit className="text-5xl text-blue-600" />,
    },
    {
      title: "Step 5: Get Real-Time Updates",
      description:
        "Stay informed with real-time updates on your ambulance location and ETA. Our tracking feature allows you to know where your ride is at all times.",
      icon: <FaMapMarkerAlt className="text-5xl text-blue-600" />,
    },
    {
      title: "Step 6: Complete Your Ride",
      description:
        "Once you reach your destination, our team will mark the ride as complete. You can rate the ride and provide feedback to help us improve our service.",
      icon: <FaStar className="text-5xl text-blue-600" />,
    },
  ];

  return (
    <section className="py-16 mb-28 font-sansita">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-center flex-col mb-16">
          <h3 className="text-3xl md:text-4xl lg:text-5xl mt-7 mb-3 text-black lg:text-start uppercase font-bold">
            Instructions{" "}
          </h3>
          <hr className="w-[73px] border-b-4 border-green-300 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md p-6 bg-white border-t-4 border-blue-500 hover:bg-blue-50 hover:border-blue-600 transition transform hover:scale-105 hover:shadow-lg duration-300"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
