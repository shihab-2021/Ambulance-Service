import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import Footer from "../../Components/Shared/Footer/Footer";
import useAuth from "../../Components/Context/useAuth";
import { useRouter } from "next/router";
import Loading from "../../Components/Shared/Loading/Loading";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const StarRating = () => {
  const { userInfo } = useAuth();
  const router = useRouter();
  const id = router?.query?.id;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://rescue-reach-server.vercel.app/user/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      // router.replace("/");
    }
  }, [id]);
  let bday = new Date(data?.birthDate);
  bday = bday?.toLocaleDateString();
  console.log(data);

  const newObj = { ...data };

  delete newObj.rating;
  delete newObj._id;
  console.log(newObj, data);

  const [value, setValue] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newObj) {
      const driverData = {
        ...newObj,
        rating: [
          ...data?.rating,
          {
            reporterId: userInfo?._id,
            reporterEmail: userInfo?.email,
            rating: value,
          },
        ],
      };
      console.log(driverData);
      fetch("https://rescue-reach-server.vercel.app/profile-update", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(driverData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            alert("Rating submitted!");
          }
        });
    }
  };
  return (
    <div>
      <Navbar />
      <div className=" container mx-auto font-sansita rounded-[.5rem]">
        <h1 className="text-center text-2xl pt-5">USER DETAILS</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div className=" p-5 grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="card-design text-center p-2 py-5">
              <h1 className="text-xs text-gray-600">NAME</h1>
              <h1 className="text-xl">{data?.displayName}</h1>
            </div>
            <div className="card-design text-center p-2 py-5">
              <h1 className="text-xs text-gray-600">EMAIL</h1>
              <h1 className="text-xl">{data?.email}</h1>
            </div>
            <div className="card-design text-center p-2 py-5">
              <h1 className="text-xs text-gray-600">PHONE</h1>
              <h1 className="text-xl">{data?.phone}</h1>
            </div>
            <div className="card-design text-center p-2 py-5">
              <h1 className="text-xs text-gray-600">GENDER</h1>
              <h1 className="text-xl">{data?.gender}</h1>
            </div>
            <div className="card-design text-center p-2 py-5">
              <h1 className="text-xs text-gray-600">BIRTHDAY</h1>
              <h1 className="text-xl">{bday}</h1>
            </div>
            <div className="card-design text-center p-2 py-5">
              <h1 className="text-xs text-gray-600">ADDRESS</h1>
              <h1 className="text-xl">{data?.address}</h1>
            </div>
            <div className="card-design text-center p-2 py-5">
              <h1 className="text-xs text-gray-600">PROFESSION</h1>
              <h1 className="text-xl">{data?.profession}</h1>
            </div>
          </div>
        )}

        <div className="bg-[#36393e1a] rounded-[.5rem] w-full md:w-2/3 lg:w-1/2 p-3 m-auto my-10  ">
          <div className="pt-5 ">
            <h2 className=" text-3xl text-center">RATE DRIVER</h2>
            <form
              id="make-admin"
              className="my-5 text-center mx-auto"
              onSubmit={submitHandler}
              style={{ maxWidth: "25rem" }}
            >
              <br />
              <Rating
                name="rating"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                style={{ color: "red" }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <br />
              <br />
              <br />
              <button
                className=" border py-2 px-3 rounded-lg border-red-500 text-xl text-red-500 mx-auto"
                type="submit"
              >
                Submit Rating
              </button>
              <br />
              <br />
              {/* {success && alert("Made Admin successfully!")} */}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StarRating;
