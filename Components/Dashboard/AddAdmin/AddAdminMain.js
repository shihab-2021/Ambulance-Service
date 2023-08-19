import React, { useState } from "react";
import swal from "sweetalert";

const AddAdminMain = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };

    fetch("https://rescue-reach-server.vercel.app/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          //   setSuccess(true);
          swal("Made Admin successfully!", {
            icon: "success",
          });
          document.getElementById("make-admin").reset();
        } else {
          swal("Please enter a valid email!", {
            icon: "error",
          });
          document.getElementById("make-admin").reset();
        }
      });

    e.preventDefault();
  };
  return (
    <div className="bg-[#36393e52] rounded-[.5rem] w-full md:w-2/3 lg:w-1/2 p-3 m-auto my-5">
      <div className="pt-5 ">
        <h2 className=" text-xl text-center">MAKE AN ADMIN</h2>
        <form
          id="make-admin"
          className="my-5 text-center mx-auto"
          onSubmit={handleAdminSubmit}
          style={{ maxWidth: "25rem" }}
        >
          <input
            required
            placeholder="Enter email to make admin"
            className="text-xl bg-auto text-black p-2 border-slate-500 border rounded-lg w-full"
            type="email"
            onBlur={handleOnBlur}
          />
          <br />
          <br />
          <button
            className=" border py-2 px-3 rounded-lg border-teal-500 text-xl text-teal-500 mx-auto"
            type="submit"
          >
            Make Admin
          </button>
          <br />
          <br />
          {/* {success && alert("Made Admin successfully!")} */}
        </form>
      </div>
    </div>
  );
};

export default AddAdminMain;
