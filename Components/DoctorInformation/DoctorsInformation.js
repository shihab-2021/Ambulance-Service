import React, { useState } from "react";
import DialogLayout from "../Shared/Dialog/DialogLayout";

const DoctorsInformation = ({ doctors }) => {
  const [openDoctorDetails, setOpenDoctorDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  return (
    <div className="container mx-auto px-4 font-sansita ">
      <DialogLayout
        open={openDoctorDetails}
        setOpen={setOpenDoctorDetails}
        bgColor={"#242629"}
        width={700}
      >
        <div className="text-white p-4 font-sansita">
          <h1 className="mt-5">Doctor Id: {selectedDoctor?._id}</h1>
          <h2 className="text-2xl mt-4 font-semibold">
            Doctor Name: {selectedDoctor?.doctorName}
          </h2>
          <p className={`text-gray-300 text-xl`}>
            Specialty: {selectedDoctor?.expertiseIn}
          </p>
          <p className={`text-gray-300 text-xl`}>
            Hospital: {selectedDoctor?.hospital}
          </p>
          <p className={`text-blue-500 text-xl dark:text-blue-300 mt-2`}>
            Contact: {selectedDoctor.contact}
          </p>
          <p className="text-lg my-5">
            Description: {selectedDoctor?.description}
          </p>
        </div>
      </DialogLayout>
      <h3 className="text-xl md:text-2xl lg:text-4xl mb-7 text-black lg:text-start uppercase font-bold mt-5">
        <span className="text-green-300">Doctors </span>Information
        <hr className="w-[73px] border-b-4 border-green-300 " />{" "}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 ">
        {doctors?.map((doctor) => (
          <div className={`bg-[#ffffff] border rounded-lg shadow-lg p-4`}>
            <h2 className="text-xl font-semibold">
              Doctor Name: {doctor?.doctorName}
            </h2>
            <p className={`text-black`}>Specialty: {doctor?.expertiseIn}</p>
            <p className={`text-black`}>Hospital: {doctor?.hospital}</p>
            <p className={`text-blue-500 dark:text-blue-300 mt-2`}>
              Contact: {doctor.contact}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setOpenDoctorDetails(true);
                }}
              >
                View Details
              </button>
              {/* <button
                className="bg-red-500 hover:bg-red-600 text-black py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
                onClick={() => deleteItem(doctor)}
              >
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsInformation;
