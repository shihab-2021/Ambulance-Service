import React, { useEffect, useState } from "react";
import ManageUserElement from "./ManageUserElement";
import Loading from "../../Shared/Loading/Loading";

const ManageUserMain = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://rescue-reach-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUsers(data);
      });
  }, []);
  const remainingUsers = (id) => {
    const remaining = users.filter((user) => user._id !== id);
    setUsers(remaining);
  };
  let i = 0;
  console.log(users);
  return (
    <div className="md:p-10 p-2 card-design">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-2xl mb-3">Manage Users</h1>
      </div>
      <div className="mx-auto overflow-x-auto w-full">
        <table className="table-auto text-left border-collapse mx-auto card-design w-full min-h-[100px]">
          <thead className="">
            <tr className="border-b-2 py-3">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody className="">
            {loading ? (
              <Loading />
            ) : (
              users?.map((user) => {
                if (user.role != "admin") i++;
                return user.role != "admin" ? (
                  <ManageUserElement
                    remainingUsers={remainingUsers}
                    data={user}
                    i={i}
                    key={user._id}
                  />
                ) : (
                  ""
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUserMain;
