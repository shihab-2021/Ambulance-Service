import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UserInfo from "../UserInfo/UserInfo";

const UserProfileMain = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const [data, setData] = useState();
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
  return (
    <div>
      <UserInfo data={data} />
    </div>
  );
};

export default UserProfileMain;
