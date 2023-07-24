import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerIcon from "../../../assets/Marker.png";

const Map = () => {
  const markers = [
    {
      geocode: [22.85, 91.7643693],
      popup: "Hello, pop up 1",
    },
    {
      geocode: [22.16, 91.99],
      popup: "Hello, pop up 2",
    },
    {
      geocode: [22.3599922, 91.7643693],
      popup: "Hello, pop up 3",
    },
  ];
  const customIcon = new Icon({
    iconUrl: "https://i.ibb.co/Dw3jpcX/Marker.png",
    // iconUrl: require("../../../assets/Marker.png"),
    iconSize: [20, 20],
  });

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Get the user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  // console.log(latitude, longitude);
  return (
    <div>
      {latitude && longitude && (
        <MapContainer center={[latitude, longitude]} zoom={8}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers?.map((marker) => (
            <Marker position={marker?.geocode} icon={customIcon}>
              <Popup>{marker?.popup}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
