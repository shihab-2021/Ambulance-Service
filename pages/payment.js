import React from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import PaymentIndex from "../Components/Payment/PaymentIndex";
import Head from "next/head";

const payment = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <Navbar />
      <PaymentIndex />
      <Footer />
    </>
  );
};

export default payment;
