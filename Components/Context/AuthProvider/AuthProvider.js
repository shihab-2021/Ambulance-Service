import React, { createContext, useEffect, useState } from "react";
import useFirebase from "../useFirebase";
import useAuth from "../useAuth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allContexts = useFirebase();
  // const user = allContexts?.user;
  // const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   const watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ latitude, longitude });
  //     },
  //     (error) => {
  //       console.error(error);
  //       setLoading(false); // Stop loading if there's an error
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       maximumAge: 0,
  //     }
  //   );
  //   return () => {
  //     // Clean up the geolocation watch on component unmount
  //     navigator.geolocation.clearWatch(watchId);
  //   };
  // }, [user]);
  // useEffect(() => {
  //   // Function to fetch active user data from the backend
  //   const fetchActiveUsers = async () => {
  //     if (location && user?.email) {
  //       fetch("https://rescue-reach-server.vercel.app/activeUsers-data", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           ...location,
  //           email: user?.email,
  //         }),
  //       }).then(() => console.log("send again"));
  //       console.log(location);
  //     }
  //   };
  //   // Fetch active users initially
  //   fetchActiveUsers();
  //   // Fetch active users every 5 seconds
  //   const interval = setInterval(fetchActiveUsers, 8000);
  //   // Clean up the interval on component unmount
  //   return () => clearInterval(interval);
  // }, [location]);
  return (
    <AuthContext.Provider value={allContexts}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
