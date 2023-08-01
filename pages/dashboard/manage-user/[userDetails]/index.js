import { useRouter } from "next/router";
import Layout from "../../../../Components/Dashboard/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import adminCheck from "../../../../Components/Context/adminCheck";
import Loading from "../../../../Components/Shared/Loading/Loading";

// export default function UserDetailsPage({}) {
const UserDetailsPage = ({}) => {
  const router = useRouter();
  const id = router.query.userDetails;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`https://rescue-reach-server.vercel.app/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data);
      });
  }, [id]);
  let bday = new Date(user.birthDate);
  bday = bday?.toLocaleDateString();
  // if (bday) bday = bday?.toISOString();
  console.log(bday);
  return (
    <div className="bg-[#1e2124] text-white ">
      <Layout>
        <div className="bg-[#36393e52] rounded-[.5rem]">
          <h1 className="text-center text-2xl pt-5">USER DETAILS</h1>
          {loading ? (
            <Loading />
          ) : (
            <div className=" p-5 grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="card-design text-center p-2 py-5">
                <h1 className="text-xs text-gray-500">NAME</h1>
                <h1 className="text-xl">{user.displayName}</h1>
              </div>
              <div className="card-design text-center p-2 py-5">
                <h1 className="text-xs text-gray-500">EMAIL</h1>
                <h1 className="text-xl">{user.email}</h1>
              </div>
              <div className="card-design text-center p-2 py-5">
                <h1 className="text-xs text-gray-500">PHONE</h1>
                <h1 className="text-xl">{user.phone}</h1>
              </div>
              <div className="card-design text-center p-2 py-5">
                <h1 className="text-xs text-gray-500">GENDER</h1>
                <h1 className="text-xl">{user.gender}</h1>
              </div>
              <div className="card-design text-center p-2 py-5">
                <h1 className="text-xs text-gray-500">BIRTHDAY</h1>
                <h1 className="text-xl">{bday}</h1>
              </div>
              <div className="card-design text-center p-2 py-5">
                <h1 className="text-xs text-gray-500">ADDRESS</h1>
                <h1 className="text-xl">{user.address}</h1>
              </div>
              <div className="card-design text-center p-2 py-5">
                <h1 className="text-xs text-gray-500">PROFESSION</h1>
                <h1 className="text-xl">{user.profession}</h1>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default adminCheck(UserDetailsPage);
