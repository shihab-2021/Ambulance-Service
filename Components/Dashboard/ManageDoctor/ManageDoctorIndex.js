import React, { useEffect, useState } from "react";
import DialogLayout from "../../Shared/Dialog/DialogLayout";
import swal from "sweetalert";

const ManageDoctorIndex = () => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [openDoctorDetails, setOpenDoctorDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch("https://rescue-reach-server.vercel.app/doctor")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setDoctors(data);
      });
  }, []);
  const deleteItem = (data) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `https://rescue-reach-server.vercel.app/delete-doctor/${data?._id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            const remainingDoctors = doctors?.filter(
              (item) => item?._id !== data?._id
            );
            setDoctors(remainingDoctors);
            swal("Doctor delete successful!", {
              icon: "success",
            });
          });
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-7">Doctors</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        {doctors?.map((doctor) => (
          <div className={`bg-[#36393e52] rounded-lg shadow-lg p-4`}>
            <h2 className="text-xl font-semibold">
              Doctor Name: {doctor?.doctorName}
            </h2>
            <p className={`text-gray-300`}>Specialty: {doctor?.expertiseIn}</p>
            <p className={`text-gray-300`}>Hospital: {doctor?.hospital}</p>
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
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
                onClick={() => deleteItem(doctor)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDoctorIndex;
