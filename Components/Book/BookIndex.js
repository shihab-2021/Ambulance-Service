import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../Context/useAuth";

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

  const places = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "Charlotte",
    "Memphis",
    "Baltimore",
    "San Francisco",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington, D.C.",
    "Boston",
    "El Paso",
    "Nashville",
    "Las Vegas",
    "Oklahoma City",
    "Portland",
    "Detroit",
    "Milwaukee",
    "Miami",
    "Sacramento",
    "Pittsburgh",
    "Kansas City",
    "Tucson",
    "Minneapolis",
    "Cincinnati",
    "Orlando",
    "Las Cruces",
    "Long Beach",
    "Bakersfield",
    "Colorado Springs",
    "Wichita",
    "Oakland",
    "New Orleans",
    "Cleveland",
    "Mesa",
    "Tulsa",
    "Arlington",
    "Anaheim",
    "Corpus Christi",
    "Lexington",
    "Anchorage",
    "Honolulu",
  ];
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDropdown, setPickUpDropdown] = useState(false);
  const [dropLocation, setDropLocation] = useState("");
  const [dropDropdown, setDropDropdown] = useState(false);

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

  const submitHandler = async (info) => {
    // event.preventDefault();
    const rideInfo = {
      ...info,
      requester: userInfo,
      pickUpLocation: pickUpLocation,
      dropLocation: dropLocation,
    };
    console.log(rideInfo);
    // setIsLoading(true);
    // fetch("https://rescue-reach-server.vercel.app/rideRequest", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ...rideInfo,
    //   }),
    // }).then(() => {
    //   alert("Ride request added!");
    //   setIsLoading(false);
    // });
    // const form = event.target;
    // const pickupDate = form.courseStartingDate?.value;
    // const caseName = form.case?.value;
    // console.log(caseName);
    // console.log(pickupDate);
    // const dateTime = new Date(pickupDate);

    // // Get the local date and time strings
    // const localDateString = dateTime.toLocaleDateString();
    // const localTimeString = dateTime.toLocaleTimeString();

    // // Combine the local date and time strings
    // const localDateTimeString = `${localDateString} ${localTimeString}`;

    // console.log(localDateTimeString);
  };
  return (
    <div className="my-14">
      <div>
        <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-lg bg-slate-50 mt-5">
          <h1 className="text-xl font-bold text-black capitalize">
            Booking Details
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-black" htmlFor="passwordConfirmation">
                  Select Case
                </label>
                <select
                  name="case"
                  {...register("case")}
                  // {...register("location", { required: true })}
                  className="block w-full px-4 py-2 mt-2  rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Emergency">Emergency</option>
                  <option value="Medium Condition">Medium Condition</option>
                  <option value="Normal Condition">Normal Condition</option>

                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-black" htmlFor="passwordConfirmation">
                  System
                </label>
                <select
                  name="system"
                  {...register("system")}
                  // {...register("location", { required: true })}
                  className="block w-full px-4 py-2 mt-2  rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  value={pickUpLocation}
                  onChange={handlePickUpInputChange}
                  onFocus={() => setPickUpDropdown(true)}
                  onBlur={() => handlePickUpSelectPlace(pickUpLocation)}
                  placeholder="Type a place..."
                />
                {pickUpDropdown && (
                  <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto ">
                    {places
                      ?.filter((place) =>
                        place
                          ?.toLowerCase()
                          ?.includes(pickUpLocation?.toLowerCase())
                      )
                      .map((place, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onMouseDown={() => handlePickUpSelectPlace(place)}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
                {/* <input
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  list="placeOptions"
                  placeholder="Type a place..."
                />
                <datalist id="placeOptions" className="absolute w-full">
                  {places.map((place, index) => (
                    <option key={index} value={place} />
                  ))}
                </datalist> */}
                {/* <datalist id="placeOptions">
                  {places.map((place, index) => (
                    <option key={index} value={place} />
                  ))}
                </datalist> */}
                {/* <input
                  name="pickupLocation"
                  {...register("pickupLocation")}
                  // {...register("productName", { required: true })}
                  id="pickupLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                /> */}
              </div>
              <div className="relative">
                <label className="text-black" htmlFor="dropLocation">
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
                  <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[250px] overflow-y-auto ">
                    {places
                      ?.filter((place) =>
                        place
                          ?.toLowerCase()
                          ?.includes(dropLocation?.toLowerCase())
                      )
                      .map((place, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onMouseDown={() => handleDropSelectPlace(place)}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
                {/* <input
                  name="dropLocation"
                  {...register("dropLocation")}
                  // {...register("originalPrice", { required: true })}
                  id="dropLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                /> */}
              </div>
              <div>
                <label className="text-black" htmlFor="cost">
                  Cost(provable)
                </label>
                <input
                  name="cost"
                  {...register("cost")}
                  // {...register("productName", { required: true })}
                  id="cost"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div className="">
                <label className="text-black" htmlFor="date">
                  Date
                </label>
                <div className="relative">
                  <input
                    required=""
                    {...register("rideDateTime")}
                    // className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] foc us:outline-0 bg-[#F6F7FF] "
                    // className="py-2 border rounded-md w-full px-4"
                    className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    name="rideDateTime"
                    type="datetime-local"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                  {/* <DatePicker
                  id="mydate"
                  className="py-2 border rounded-md w-full px-4"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <FaCalendarAlt className="absolute top-3 right-5" /> */}
                </div>
              </div>
            </div>

            <div className="my-3">
              <label className="text-black" htmlFor="desc">
                Patient Description (Optional)
              </label>
              <textarea
                name="description"
                {...register("description")}
                id="desc"
                type="textarea"
                className="block h-36 w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            <p className="text-center mt-2 text-black font-semibold">
              Note: Make Sure You Fill-Up Every Filed!
            </p>
            <div className="flex justify-center mt-6">
              <input
                type="submit"
                value="Submit Document"
                className="btn dropShadow btn-outline text-black"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BookIndex;
