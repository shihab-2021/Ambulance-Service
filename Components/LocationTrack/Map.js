import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import useAuth from "../Context/useAuth";

const Map = () => {
  const { user, location } = useAuth();
  const customIcon = new Icon({
    iconUrl: "https://i.ibb.co/Dw3jpcX/Marker.png",
    // iconUrl: require("../../../assets/Marker.png"),
    iconSize: [20, 20],
  });

  const [latitude, setLatitude] = useState(location?.latitude);
  const [longitude, setLongitude] = useState(location?.longitude);

  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Function to fetch active user data from the backend
    const fetchActiveUsers = async () => {
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
    const interval = setInterval(fetchActiveUsers, 10000);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  return (
    <div>
      {latitude && longitude && (
        <MapContainer center={[latitude, longitude]} zoom={11}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <DirectionMap waypoints={waypoints} /> */}
          {activeUsers && activeUsers[0] && (
            <>
              {activeUsers?.map((marker) => (
                <Marker
                  position={[marker?.latitude, marker?.longitude]}
                  icon={customIcon}
                >
                  {/* <Popup>{marker?.popup}</Popup> */}
                </Marker>
              ))}
            </>
          )}
          <Marker position={[latitude, longitude]} icon={customIcon}>
            {/* <Popup>{marker?.popup}</Popup> */}
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
