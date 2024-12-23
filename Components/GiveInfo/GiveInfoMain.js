import React, { useEffect, useState } from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileEdit from "./ProfileEdit";
import useAuth from "../Context/useAuth";
import Loading from "../Shared/Loading/Loading";

const GiveInfoMain = () => {
  const { user } = useAuth();
  const [data, setData] = useState();
  useEffect(() => {
    fetch(
      `https://ambulance-project-backend.vercel.app/users-data/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [data, user?.email]);
  return (
    <div className="font-sansita">
      {!data && <Loading></Loading>}
      {data && (
        <div>
          <ProfileBanner data={data}></ProfileBanner>
          {/* From for giving information  */}
          <div className="container mx-auto px-4">
            <div className="my-5 rounded bg-slate-200  px-4 py-4 text-center  ">
              <h4 className="text-3xl font-bold">
                Make Your Profile Look Batter by Filling the Form
              </h4>
            </div>
            <ProfileEdit data={data}></ProfileEdit>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveInfoMain;
