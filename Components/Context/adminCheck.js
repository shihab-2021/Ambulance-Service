/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import Loading from "../Shared/Loading/Loading";

const adminCheck = (WrappedComponent) => {
  const PrivateRoute = () => {
    const { user, userInfo, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
      console.log("object");
      return (
        <div className="my-5 py-5">
          <div className="d-flex justify-content-center my-5 py-5">
            <Loading />
          </div>
        </div>
      );
    }

    useEffect(() => {
      console.log(userInfo);
      if (userInfo?.email && userInfo?.role !== "admin") {
        router.replace("/");
        swal(`Your are not allowed to go that link!!!`, {
          icon: "error",
        });
      }
      // if (!user?.email) {
      //   router.replace("/");
      // }
    }, [userInfo, user, isLoading]);

    if (userInfo?.email && userInfo?.role === "admin") {
      return <WrappedComponent />;
    }

    if (user?.email) {
      // return <WrappedComponent />;
    } else {
      router?.replace("/");
      swal(`Your are not logged in. Please login!`, {
        icon: "error",
      });
    }

    return <Loading />;
  };
  return PrivateRoute;
};

export default adminCheck;
