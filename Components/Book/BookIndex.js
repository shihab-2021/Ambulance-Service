import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
const BookIndex = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="my-14">
      <div>
        <section className="max-w-4xl p-6 mx-auto bg-green-500 rounded-md shadow-md dark:bg-gray-800 mt-5">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Booking Details
          </h1>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Select Case
                </label>
                <select
                  // {...register("location", { required: true })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Emergency">Emergency</option>
                  <option value="Medium Condition">Medium Condition</option>
                  <option value="Normal Condition">Normal Condition</option>

                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  System
                </label>
                <select
                  // {...register("location", { required: true })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Advance">Advance</option>
                  <option value="At Present">At Present</option>

                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="pickupLocation"
                >
                  Pick Up Location
                </label>
                <input
                  // {...register("productName", { required: true })}
                  id="pickupLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {/* {errors.productName && (
                    <span className="mt-3 text-gray-800">
                      productName field is required
                    </span>
                  )} */}
              </div>

              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="dropLocation"
                >
                  Drop Location
                </label>
                <input
                  // {...register("originalPrice", { required: true })}
                  id="dropLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {/* {errors.originalPrice && (
                    <span className="mt-3 text-gray-800">
                      originalPrice field is required
                    </span>
                  )} */}
              </div>
            </div>
            <div className="my-3">
              <label className="text-white dark:text-gray-200" htmlFor="date">
                Date
              </label>
              <div className="relative">
                <DatePicker
                  id="mydate"
                  className="py-2 border rounded-md w-full px-4"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <FaCalendarAlt className="absolute top-3 right-5" />
              </div>
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="desc">
                Patient Description (Optional)
              </label>
              <textarea
                id="desc"
                type="textarea"
                className="block h-36 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            <p className="text-center mt-2 text-white font-semibold">
              Note: Make Sure You Fill-Up Every Filed!
            </p>
            <div className="flex justify-center mt-6">
              <input
                type="submit"
                value="Submit Document"
                className="btn dropShadow btn-outline text-white"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BookIndex;
