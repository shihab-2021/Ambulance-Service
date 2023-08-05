import { useEffect, useState } from "react";
import Banner from "./Banner";
import HowToBook from "./HowToBook/HowToBook";
import io from "socket.io-client";
import useAuth from "../Context/useAuth";
import axios from "axios";
import { FaAmbulance, FaMedkit, FaClock } from "react-icons/fa";
import HowToUseSection from "./HowToUseSection";

const HomeIndex = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading status

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
        setLoading(false); // Stop loading if there's an error
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );

    return () => {
      // Clean up the geolocation watch on component unmount
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const apiKey = "AIzaSyBN1gauK2nrHna23I7pRWqpp0ORgxJ6Yjc"; // Replace with your Google Maps API key
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}&key=${apiKey}`;
    // const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=22.16,91.99&key=${apiKey}`;

    axios
      .get(geocodeUrl)
      .then((response) => {
        if (response.data.status === "OK") {
          // const placeName = response.data.results[0].formatted_address;
          const placeName = response.data.results[3].formatted_address;
          console.log(response.data.results);
          setLocationName(placeName);
        } else {
          setLocationName("Location not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching geocode data:", error);
        setLocationName("Error fetching location data");
      });
  }, [location?.latitude, location?.longitude]);

  useEffect(() => {
    // Function to fetch active user data from the backend
    const fetchActiveUsers = async () => {
      console.log(location);
      if (location && user?.email) {
        fetch("https://rescue-reach-server.vercel.app/activeUsers-data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...location,
            email: user?.email,
            // lastUpdated: new Date(),
          }),
        }).then(() => console.log("send again"));
      }
      try {
        const response = await fetch(
          "https://rescue-reach-server.vercel.app/active-users"
        );
        const data = await response.json();
        setActiveUsers(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching active users:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    // Fetch active users initially
    fetchActiveUsers();

    // Fetch active users every 5 seconds
    const interval = setInterval(fetchActiveUsers, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [location]);
  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
      <Banner />
      {/* <h1>{locationName}</h1>
      <ul>
        {activeUsers.map((user) => (
          <li key={user._id}>
            {user.name} - Latitude: {user.latitude}, Longitude: {user.longitude}
          </li>
        ))}
      </ul> */}
      {/* {usersLocations?.map((userLocation) => (
        <div key={userLocation.id}>
          <p>User: {userLocation.name}</p>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      ))} */}
      <HowToBook />
      <HowToUseSection />
    </div>
  );
};

export default HomeIndex;
