import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAuth from "../Context/useAuth";
import swal from "sweetalert";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const BookIndex = () => {
  const { userInfo } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const cost = {
    "Banani - Evercare Hospital Dhaka": 4000,
    "Banani - World University of Bangladesh": 5000,
    "Banani - Mirpur General Hospital & Diagnostic Centre": 3000,
    "Banani - Radical Hospitals Ltd.": 3500,
    "Banani - Mirpur-1": 2000,
    "Banani - Mirpur-2": 2500,
    "Banani - Mirpur 11": 2800,
    "Banani - Uttara Sector-5": 4500,
    "Evercare Hospital Dhaka - Banani": 4000,
    "World University of Bangladesh - Banani": 5000,
    "Mirpur General Hospital & Diagnostic Centre - Banani": 3000,
    "Radical Hospitals Ltd. - Banani": 3500,
    "Mirpur-1 - Banani": 2000,
    "Mirpur-2 - Banani": 2500,
    "Mirpur 11 - Banani": 2800,
    "Uttara Sector-5 - Banani": 4500,
    "Evercare Hospital Dhaka - World University of Bangladesh": 3500,
    "Evercare Hospital Dhaka - Mirpur General Hospital & Diagnostic Centre": 4000,
    "Evercare Hospital Dhaka - Radical Hospitals Ltd.": 2000,
    "Evercare Hospital Dhaka - Mirpur-1": 4500,
    "Evercare Hospital Dhaka - Mirpur-2": 4700,
    "Evercare Hospital Dhaka - Mirpur 11": 5000,
    "Evercare Hospital Dhaka - Uttara Sector-5": 3000,
    "World University of Bangladesh - Evercare Hospital Dhaka": 3500,
    "Mirpur General Hospital & Diagnostic Centre - Evercare Hospital Dhaka": 4000,
    "Radical Hospitals Ltd. - Evercare Hospital Dhaka": 2000,
    "Mirpur-1 - Evercare Hospital Dhaka": 4500,
    "Mirpur-2 - Evercare Hospital Dhaka": 4700,
    "Mirpur 11 - Evercare Hospital Dhaka": 5000,
    "Uttara Sector-5 - Evercare Hospital Dhaka": 3000,
    "World University of Bangladesh - Mirpur General Hospital & Diagnostic Centre": 4500,
    "World University of Bangladesh - Radical Hospitals Ltd.": 2500,
    "World University of Bangladesh - Mirpur-1": 3500,
    "World University of Bangladesh - Mirpur-2": 3900,
    "World University of Bangladesh - Mirpur 11": 4000,
    "World University of Bangladesh - Uttara Sector-5": 1800,
    "Mirpur General Hospital & Diagnostic Centre - World University of Bangladesh": 4500,
    "Radical Hospitals Ltd. - World University of Bangladesh": 2500,
    "Mirpur-1 - World University of Bangladesh": 3500,
    "Mirpur-2 - World University of Bangladesh": 3900,
    "Mirpur 11 - World University of Bangladesh": 4000,
    "Uttara Sector-5 - World University of Bangladesh": 1800,
    "Mirpur General Hospital & Diagnostic Centre - Radical Hospitals Ltd.": 4000,
    "Mirpur General Hospital & Diagnostic Centre - Mirpur-1": 1500,
    "Mirpur General Hospital & Diagnostic Centre - Mirpur-2": 1800,
    "Mirpur General Hospital & Diagnostic Centre - Mirpur 11": 2000,
    "Mirpur General Hospital & Diagnostic Centre - Uttara Sector-5": 4500,
    "Radical Hospitals Ltd. - Mirpur General Hospital & Diagnostic Centre": 4000,
    "Mirpur-1 - Mirpur General Hospital & Diagnostic Centre": 1500,
    "Mirpur-2 - Mirpur General Hospital & Diagnostic Centre": 1800,
    "Mirpur 11 - Mirpur General Hospital & Diagnostic Centre": 2000,
    "Uttara Sector-5 - Mirpur General Hospital & Diagnostic Centre": 4500,
    "Radical Hospitals Ltd. - Mirpur-1": 3500,
    "Radical Hospitals Ltd. - Mirpur-2": 3800,
    "Radical Hospitals Ltd. - Mirpur 11": 4500,
    "Radical Hospitals Ltd. - Uttara Sector-5": 1500,
    "Mirpur-1 - Radical Hospitals Ltd.": 3500,
    "Mirpur-2 - Radical Hospitals Ltd.": 3800,
    "Mirpur 11 - Radical Hospitals Ltd.": 4500,
    "Uttara Sector-5 - Radical Hospitals Ltd.": 1500,
    "Mirpur-1 - Mirpur-2": 1500,
    "Mirpur-1 - Mirpur 11": 1800,
    "Mirpur-1 - Uttara Sector-5": 4500,
    "Mirpur-2 - Mirpur-1": 1500,
    "Mirpur 11 - Mirpur-1": 1800,
    "Uttara Sector-5 - Mirpur-1": 4500,
    "Mirpur-2 - Mirpur 11": 1500,
    "Mirpur-2 - Uttara Sector-5": 4700,
    "Mirpur 11 - Mirpur-2": 1500,
    "Uttara Sector-5 - Mirpur-2": 4500,
    "Mirpur 11 - Uttara Sector-5": 1500,
    "Uttara Sector-5 - Mirpur 11": 4500,
    // Add more entries for other place combinations if needed
  };
  const places = [
    "Banani",
    "Evercare Hospital Dhaka",
    "World University of Bangladesh",
    "Mirpur General Hospital & Diagnostic Centre",
    "Radical Hospitals Ltd.",
    "Mirpur-1",
    "Mirpur-2",
    "Mirpur 11",
    "Uttara Sector-5",
  ];
  const locations = {
    "Evercare Hospital Dhaka": {
      lat: 23.810561248496256,
      lan: 90.4319548979279,
    },
    Banani: {
      lat: 23.79567581916316,
      lan: 90.40074219334419,
    },
    "World University of Bangladesh": {
      lat: 23.851408431284206,
      lan: 90.37210677464142,
    },
    "Mirpur General Hospital & Diagnostic Centre": {
      lat: 23.81734454405655,
      lan: 90.36421527505252,
    },
    "Radical Hospitals Ltd.": {
      lat: 23.869750657386692,
      lan: 90.38455614580613,
    },
    "Mirpur-1": {
      lat: 23.795830578225804,
      lan: 90.3526696745058,
    },
    "Mirpur-2": {
      lat: 23.806786786627107,
      lan: 90.35657652393115,
    },
    "Mirpur 11": {
      lat: 23.81947741090012,
      lan: 90.36660668966634,
    },
    "Uttara Sector-5": {
      lat: 23.865375802151764,
      lan: 90.39364254336039,
    },
  };
  const hospitalNames = [
    "Apollo Hospitals Dhaka",
    "Square Hospitals Ltd.",
    "Ibn Sina Hospital",
    "United Hospital Ltd.",
    "Labaid Hospital",
  ];

  const dissesType = [
    "Cardiology",
    "Orthopedics",
    "Gastroenterology",
    "Neurology",
    "ENT (Ear, Nose, and Throat)",
  ];
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDropdown, setPickUpDropdown] = useState(false);
  const [dropLocation, setDropLocation] = useState("");
  const [dropDropdown, setDropDropdown] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalDropdown, setHospitalDropdown] = useState(false);
  const [disses, setDisses] = useState("");
  const [dissesDropdown, setDissesDropdown] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorDropdown, setDoctorDropdown] = useState(false);

  const handlePickUpInputChange = (event) => {
    setPickUpLocation(event.target.value);
  };

  const handlePickUpSelectPlace = (place) => {
    setPickUpLocation(place);
    setPickUpDropdown(false);
  };

  const handleDropInputChange = (event) => {
    setDropLocation(event.target.value);
  };

  const handleDropSelectPlace = (place) => {
    setDropLocation(place);
    setDropDropdown(false);
  };

  const findCost = () => {
    const key = `${pickUpLocation} - ${dropLocation}`;
    return cost[key] || 0;
  };

  const submitHandler = async (info) => {
    // event.preventDefault();
    if (!userInfo) {
      swal("User information not found! Please reload.", {
        icon: "warning",
      });
      return;
    } else if (!findCost()) {
      swal("Please select valid pick up and drop location!", {
        icon: "error",
      });
      return;
    } else if (userInfo?.role === "Driver") {
      swal("Your are not Allowed!", "Currently you are in driver account.", {
        icon: "error",
      });
      return;
    } else {
      const rideInfo = {
        ...info,
        cost: findCost(),
        requester: userInfo,
        pickUpLocation: pickUpLocation,
        dropLocation: dropLocation,
        pickUpGeoCode: locations[pickUpLocation],
        dropGeoCode: locations[dropLocation],
        hospitalName: hospitalName,
        disses: disses,
        doctorName: doctorName,
      };
      console.log(rideInfo);
      setIsLoading(true);
      fetch("https://rescue-reach-server.vercel.app/rideRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...rideInfo,
        }),
      }).then(() => {
        swal("Ride request added!", {
          icon: "success",
        });
        reset();
        setIsLoading(false);
        router?.replace("/");
      });
    }
  };

  useEffect(() => {
    fetch("https://rescue-reach-server.vercel.app/doctor")
      .then((res) => res.json())
      .then((data) => {
        setAllDoctors(data);
      });
  }, []);

  useEffect(() => {
    const filterDoctor = allDoctors?.filter(
      (item) => item?.hospital === hospitalName && item?.expertiseIn === disses
    );
    setDoctors(filterDoctor);
  }, [hospitalName, disses]);

  console.log(locations[pickUpLocation], locations[dropLocation]);

  return (
    <div className="my-14 mx-4 font-sansita">
      <div>
        {/* <section className="max-w-4xl p-6 mx-auto rounded-md shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 mt-5">
          <h1 className="text-2xl font-bold text-center capitalize text-white">
            Give Booking Details
          </h1>
          <hr className="w-20 mx-auto mt-1 mb-10 border-t-2 border-yellow-300" />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white" htmlFor="case">
                  Select Case
                </label>
                <select
                  name="case"
                  {...register("case")}
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Emergency">Emergency</option>
                  <option value="Medium Condition">Medium Condition</option>
                  <option value="Normal Condition">Normal Condition</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-white" htmlFor="system">
                  System
                </label>
                <select
                  name="system"
                  {...register("system")}
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Advance">Advance</option>
                  <option value="At Present">At Present</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="relative">
                <label className="text-white" htmlFor="pickupLocation">
                  Pick Up Location
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  value={pickUpLocation}
                  onChange={handlePickUpInputChange}
                  onFocus={() => setPickUpDropdown(true)}
                  onBlur={() => handlePickUpSelectPlace(pickUpLocation)}
                  placeholder="Type a place..."
                />
                {pickUpDropdown && (
                  <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                    {places
                      ?.filter((place) =>
                        place
                          ?.toLowerCase()
                          ?.includes(pickUpLocation?.toLowerCase())
                      )
                      .map((place, index) => (
                        <div
                          key={index}
                          className={`${
                            place !== dropLocation ? "block" : "hidden"
                          } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                          onMouseDown={() => handlePickUpSelectPlace(place)}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <label className="text-white" htmlFor="dropLocation">
                  Drop Location
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  value={dropLocation}
                  onChange={handleDropInputChange}
                  onFocus={() => setDropDropdown(true)}
                  onBlur={() => handleDropSelectPlace(dropLocation)}
                  placeholder="Type a place..."
                />
                {dropDropdown && (
                  <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                    {places
                      ?.filter((place) =>
                        place
                          ?.toLowerCase()
                          ?.includes(dropLocation?.toLowerCase())
                      )
                      .map((place, index) => (
                        <div
                          key={index}
                          className={`${
                            place !== pickUpLocation ? "block" : "hidden"
                          } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                          onMouseDown={() => handleDropSelectPlace(place)}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-white" htmlFor="cost">
                  Cost
                </label>
                <input
                  name="cost"
                  value={pickUpLocation && dropLocation && findCost()}
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  readOnly
                />
              </div>
              <div>
                <label className="text-white" htmlFor="rideDateTime">
                  Date & Time
                </label>
                <div className="relative">
                  <input
                    required
                    {...register("rideDateTime")}
                    className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    name="rideDateTime"
                    type="datetime-local"
                    placeholder="Select a date and time..."
                  />
                </div>
              </div>
            </div>

            <div className="my-3">
              <label className="text-white" htmlFor="description">
                Patient Description (Optional)
              </label>
              <textarea
                name="description"
                {...register("description")}
                id="description"
                type="textarea"
                className="block h-36 w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            <p className="text-center mt-2 text-yellow-300 font-semibold">
              Note: Make Sure You Fill-Up Every Field!
            </p>
            <div className="flex justify-center mt-6">
              <input
                type="submit"
                value="Submit Document"
                className="btn dropShadow btn-outline outline-green-300  hover:btn-ghost text-white hover:text-green-400 "
              />
            </div>
          </form>
        </section> */}
        <section className="max-w-4xl p-6 mx-auto border rounded-md shadow-lg bg-white mt-5">
          <h1 className="text-2xl font-bold text-center capitalize text-black">
            Give Booking Details
          </h1>
          <hr className="w-20 mx-auto mt-1 mb-10 border-t-2 border-red-300" />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-black" htmlFor="case">
                  Select Case
                </label>
                <select
                  name="case"
                  {...register("case")}
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 focus:outline-none focus:ring"
                >
                  <option value="Emergency">Emergency</option>
                  <option value="Medium Condition">Medium Condition</option>
                  <option value="Normal Condition">Normal Condition</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-black" htmlFor="system">
                  System
                </label>
                <select
                  name="system"
                  {...register("system")}
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 focus:outline-none focus:ring"
                >
                  <option value="Advance">Advance</option>
                  <option value="At Present">At Present</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="relative">
                <label className="text-black" htmlFor="pickupLocation">
                  Pick Up Location
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 focus:outline-none focus:ring"
                  type="text"
                  value={pickUpLocation}
                  onChange={handlePickUpInputChange}
                  onFocus={() => setPickUpDropdown(true)}
                  onBlur={() => handlePickUpSelectPlace(pickUpLocation)}
                  placeholder="Type a place..."
                />
                {pickUpDropdown && (
                  <div className="absolute z-10 bg-white border border-black mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                    {places
                      ?.filter((place) =>
                        place
                          ?.toLowerCase()
                          ?.includes(pickUpLocation?.toLowerCase())
                      )
                      .map((place, index) => (
                        <div
                          key={index}
                          className={`${
                            place !== dropLocation ? "block" : "hidden"
                          } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                          onMouseDown={() => handlePickUpSelectPlace(place)}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <label className="text-black" htmlFor="dropLocation">
                  Drop Location
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 focus:outline-none focus:ring"
                  type="text"
                  value={dropLocation}
                  onChange={handleDropInputChange}
                  onFocus={() => setDropDropdown(true)}
                  onBlur={() => handleDropSelectPlace(dropLocation)}
                  placeholder="Type a place..."
                />
                {dropDropdown && (
                  <div className="absolute z-10 bg-white border border-black mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                    {places
                      ?.filter((place) =>
                        place
                          ?.toLowerCase()
                          ?.includes(dropLocation?.toLowerCase())
                      )
                      .map((place, index) => (
                        <div
                          key={index}
                          className={`${
                            place !== pickUpLocation ? "block" : "hidden"
                          } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                          onMouseDown={() => handleDropSelectPlace(place)}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-black" htmlFor="cost">
                  Cost
                </label>
                <input
                  name="cost"
                  value={pickUpLocation && dropLocation && findCost()}
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  readOnly
                />
              </div>
              <div>
                <label className="text-black" htmlFor="rideDateTime">
                  Date & Time
                </label>
                <div className="relative">
                  <input
                    required
                    {...register("rideDateTime")}
                    className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    name="rideDateTime"
                    type="datetime-local"
                    placeholder="Select a date and time..."
                  />
                </div>
              </div>
            </div>
            <div className="basis-1/2 mt-4 ">
              {locations[pickUpLocation] &&
                locations[dropLocation] &&
                !pickUpDropdown &&
                !dropDropdown && (
                  <Map
                    data={{
                      pickUpLocation: pickUpLocation,
                      dropLocation: dropLocation,
                      pickUpGeoCode: locations[pickUpLocation],
                      dropGeoCode: locations[dropLocation],
                    }}
                  />
                )}
            </div>
            <div
              className={`grid grid-cols-1 mt-4 ${
                hospitalName && !disses && "lg:grid-cols-2 gap-6"
              } ${hospitalName && disses && "lg:grid-cols-3 gap-4"} `}
            >
              <div className="relative">
                <label className="text-black" htmlFor="dropLocation">
                  Select Hospital
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 focus:outline-none focus:ring"
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  onFocus={() => setHospitalDropdown(true)}
                  onBlur={() => {
                    setHospitalName(hospitalName);
                    setHospitalDropdown(false);
                  }}
                  placeholder="Type a hospital..."
                />
                {hospitalDropdown && (
                  <div className="absolute z-10 bg-white border border-black mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                    {hospitalNames
                      ?.filter((hospital) =>
                        hospital
                          ?.toLowerCase()
                          ?.includes(hospitalName?.toLowerCase())
                      )
                      .map((hospital, index) => (
                        <div
                          key={index}
                          className={`${
                            hospital !== hospitalName ? "block" : "hidden"
                          } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                          onMouseDown={() => {
                            setHospitalName(hospital);
                            setHospitalDropdown(false);
                          }}
                        >
                          {hospital}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {hospitalName && (
                <div className="relative">
                  <label className="text-black" htmlFor="dropLocation">
                    Select Disses
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 focus:outline-none focus:ring"
                    type="text"
                    value={disses}
                    onChange={(e) => setDisses(e.target.value)}
                    onFocus={() => setDissesDropdown(true)}
                    onBlur={() => {
                      setDisses(disses);
                      setDissesDropdown(false);
                    }}
                    placeholder="Type a disses..."
                  />
                  {dissesDropdown && (
                    <div className="absolute z-10 bg-white border border-black mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                      {dissesType
                        ?.filter((singleDisses) =>
                          singleDisses
                            ?.toLowerCase()
                            ?.includes(disses?.toLowerCase())
                        )
                        .map((singleDisses, index) => (
                          <div
                            key={index}
                            className={`${
                              singleDisses !== disses ? "block" : "hidden"
                            } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                            onMouseDown={() => {
                              setDisses(singleDisses);
                              setDissesDropdown(false);
                            }}
                          >
                            {singleDisses}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
              {hospitalName && disses && (
                <div className="relative">
                  <label className="text-black" htmlFor="dropLocation">
                    Select Doctor
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 focus:outline-none focus:ring"
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    onFocus={() => setDoctorDropdown(true)}
                    onBlur={() => {
                      setDoctorName(doctorName);
                      setDoctorDropdown(false);
                    }}
                    placeholder="Type a doctor name..."
                  />
                  {doctorDropdown && (
                    <div className="absolute z-10 bg-white border border-black mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                      {doctors
                        ?.filter((doctor) =>
                          doctor?.doctorName
                            ?.toLowerCase()
                            ?.includes(doctorName?.toLowerCase())
                        )
                        .map((doctor, index) => (
                          <div
                            key={index}
                            className={`${
                              doctor?.doctorName !== doctorName
                                ? "block"
                                : "hidden"
                            } px-4 py-2 cursor-pointer hover:bg-gray-100`}
                            onMouseDown={() => {
                              setDoctorName(doctor?.doctorName);
                              setDoctorDropdown(false);
                            }}
                          >
                            {doctor?.doctorName}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="my-4">
              <label className="text-black" htmlFor="description">
                Patient Description (Optional)
              </label>
              <textarea
                name="description"
                {...register("description")}
                id="description"
                type="textarea"
                className="block h-36 w-full px-4 py-2 mt-2 rounded-md bg-white border border-black focus:border-red-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            <p className="text-center mt-2 text-red-500 font-semibold">
              Note: Make Sure You Fill-Up Every Field!
            </p>
            <div className="flex justify-center mt-6">
              <input
                type="submit"
                value="Submit"
                className="btn dropShadow btn-neutral outline-red-500 hover:btn-ghost text-white hover:text-red-500 "
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BookIndex;
