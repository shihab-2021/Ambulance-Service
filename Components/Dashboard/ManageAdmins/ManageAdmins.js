import React, { useEffect, useState } from "react";
import ManageAdminElement from "./ManageAdminElement";
import Loading from "../../Shared/Loading/Loading";

const ManageAdmins = () => {
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
  return (
    <div className="md:p-10 p-2">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-2xl mb-3">Manage Admins</h1>
      </div>
      <div className="mx-auto overflow-x-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Loading />
          </div>
        ) : (
          <table className="table-auto text-left border-collapse mx-auto bg-[#36393e52] rounded-[.5rem] w-full min-h-[100px]">
            <thead className="">
              <tr className="border-b-2 py-3">
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody className="">
              {users.map((user) => {
                if (user.role == "admin") i++;
                return user.role == "admin" ? (
                  <ManageAdminElement
                    data={user}
                    key={user._id}
                    i={i}
                    remainingUsers={remainingUsers}
                  />
                ) : (
                  ""
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageAdmins;
