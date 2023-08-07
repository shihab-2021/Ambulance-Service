import React from "react";
import useAuth from "../Context/useAuth";
import swal from "sweetalert";
import { useRouter } from "next/router";

const PaymentForm = ({ selectedRide, setIsLoading }) => {
  const { userInfo } = useAuth();
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const amount = form.amount.value;

    if (!userInfo) {
      swal("User information not found! Please reload.", {
        icon: "warning",
      });
      return;
    }

    if (!amount) {
      swal({
        icon: "error",
        title: "Oops...",
        text: "Please select which ride you want to pay!",
      });
      return;
    }

    const ride = selectedRide;
    const id = selectedRide?._id;
    delete ride?._id;

    swal({
      title: "Are you sure?",
      text: "Ride will be considered complete after payment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        fetch("https://rescue-reach-server.vercel.app/rideCompleted", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...ride,
          }),
        }).then(() => {
          const url = `https://rescue-reach-server.vercel.app/delete-rideBooked/${id}`;
          fetch(url, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                setIsLoading(false);
                swal("Payment successful!", {
                  icon: "success",
                });
                router.replace("/");
              }
            });
        });
      }
    });
  };
  return (
    <div className="p-6 bg-slate-100 rounded-lg h-full flex items-center ">
      <form onSubmit={handleSubmit} className="h-fit">
        <h3 className="pb-5 text-3xl font-bold ">Payment</h3>
        <label htmlFor="fname">Accepted Cards</label>
        <div className="icon-container mb-3 mt-1">
          <i
            className="fa fa-cc-visa p-2 rounded-l bg-white"
            style={{ color: "navy" }}
          ></i>
          <i
            className="fa fa-cc-amex p-2 bg-white"
            style={{ color: "blue" }}
          ></i>
          <i
            className="fa fa-cc-mastercard p-2 bg-white"
            style={{ color: "red" }}
          ></i>
          <i
            className="fa fa-cc-discover p-2 rounded-r bg-white"
            style={{ color: "orange" }}
          ></i>
        </div>
        <label className="" htmlFor="cname">
          Cardholder Name
        </label>
        <input
          type="text"
          className="w-full p-3 mb-4 border rounded mt-1"
          id="cname"
          name="cardname"
          placeholder="John Doe"
          required
        />
        <label htmlFor="cname">Amount</label>
        <input
          type="text"
          className="w-full p-3 mb-4 border rounded mt-1"
          id="amount"
          name="amount"
          value={selectedRide?.patientSide?.cost || ""}
          placeholder="Amount"
          //   disabled
          //   required
        />
        <label htmlFor="ccnum">Card Number</label>
        <input
          type="text"
          className="w-full p-3 mb-4 border rounded mt-1"
          id="ccnum"
          name="cardnumber"
          placeholder="xxxx-xxxx-xxxx-xxxx"
          required
        />
        <div className="flex flex-col md:flex-row">
          <div className="md:pr-2 md:w-1/2">
            <label htmlFor="expyear">Expiry Date</label>
            <input
              type="text"
              className="w-full p-3 mb-4 border rounded mt-1"
              id="expyear"
              name="expyear"
              placeholder="MM / YY"
              required
            />
          </div>
          <div className="md:pl-2 md:w-1/2">
            <label htmlFor="cvv">CVC / CVV</label>
            <input
              type="text"
              className="w-full p-3 mb-4 border rounded mt-1"
              id="cvv"
              name="cvv"
              placeholder="xxx"
              required
            />
          </div>
        </div>
        <input
          type="submit"
          value="Continue to checkout"
          className="btn btn-neutral w-full mt-2 uppercase transition duration-300 font-bold hover:bg-orange-500"
        />
      </form>
    </div>
  );
};

export default PaymentForm;
