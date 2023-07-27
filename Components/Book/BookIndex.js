import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BookIndex = () => {
  const [startDate, setStartDate] = useState(new Date());
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const pickupDate = form.courseStartingDate?.value;
    const caseName = form.case?.value;
    console.log(caseName);
    console.log(pickupDate);
    const dateTime = new Date(pickupDate);

    // Get the local date and time strings
    const localDateString = dateTime.toLocaleDateString();
    const localTimeString = dateTime.toLocaleTimeString();

    // Combine the local date and time strings
    const localDateTimeString = `${localDateString} ${localTimeString}`;

    console.log(localDateTimeString);
  };
  return (
    <div className="my-14">
      <div>
        <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-lg bg-slate-50 mt-5">
          <h1 className="text-xl font-bold text-black capitalize">
            Booking Details
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-black" htmlFor="passwordConfirmation">
                  Select Case
                </label>
                <select
                  name="case"
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
                  // {...register("location", { required: true })}
                  className="block w-full px-4 py-2 mt-2  rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Advance">Advance</option>
                  <option value="At Present">At Present</option>

                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-black" htmlFor="pickupLocation">
                  Pick Up Location
                </label>
                <input
                  // {...register("productName", { required: true })}
                  id="pickupLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {/* {errors.productName && (
                    <span className="mt-3 text-gray-800">
                      productName field is required
                    </span>
                  )} */}
              </div>

              <div>
                <label className="text-black" htmlFor="dropLocation">
                  Drop Location
                </label>
                <input
                  // {...register("originalPrice", { required: true })}
                  id="dropLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {/* {errors.originalPrice && (
                    <span className="mt-3 text-gray-800">
                      originalPrice field is required
                    </span>
                  )} */}
              </div>
            </div>
            <div className="my-3">
              <label className="text-black" htmlFor="date">
                Date
              </label>
              <div className="relative">
                <input
                  required=""
                  // className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] foc us:outline-0 bg-[#F6F7FF] "
                  // className="py-2 border rounded-md w-full px-4"
                  className="block w-full px-4 py-2 mt-2 rounded-md bg-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  name="courseStartingDate"
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

            <div>
              <label className="text-black" htmlFor="desc">
                Patient Description (Optional)
              </label>
              <textarea
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
