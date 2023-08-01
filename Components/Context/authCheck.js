import { useRouter } from "next/router";
import useAuth from "./useAuth";
import Loading from "../Shared/Loading/Loading";
import swal from "sweetalert";

const authCheck = (WrappedComponent) => {
  const PrivateRoute = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const userInfo = user;
    // user info
    // const user = useSelector((state) => state?.reducers?.user?.userInfoFromDB);

    if (isLoading) {
      console.log("object");
      return (
        <div className="my-5 py-5">
          <div className="d-flex justify-content-center my-5 py-5">
            {/* <Spinner animation="border" variant="danger" /> */}
            <Loading />
          </div>
        </div>
      );
    }

    // if (user?.email) {
    //   return <WrappedComponent />;
    // }
    if (user?.email) {
      return <WrappedComponent />;
    } else {
      router?.replace("/");
      //   alert("Your are not logged in. Please login!");
      swal(`Your are not logged in. Please login!`, {
        icon: "error",
      });
    }

    // return router.replace("/login");
  };
  return PrivateRoute;
};

export default authCheck;
