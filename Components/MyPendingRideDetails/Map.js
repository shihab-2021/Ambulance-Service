import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import useAuth from "../Context/useAuth";

const DirectionMap = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    // Add the routing control to the map
    if (map !== null) {
      L.Routing.control({
        waypoints,
        routeWhileDragging: true, // This is the line that was missing
        createMarker: () => null, // Hide markers
        addWaypoints: false, // Do not allow adding new waypoints
        showAlternatives: false, // Hide alternative routes
        router: new L.Routing.OSRMv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
      }).addTo(map);

      // Check if the map is initialized
      if (map !== null) {
        // Clear previous directions before adding new ones
        map.eachLayer((layer) => {
          if (layer instanceof L.Routing.Control) {
            map.removeControl(layer);
          }
        });
      }
    } else {
      console.error("The map is not initialized.");
    }
    // if (map !== null) {
    //   // Remove the routing control from the map
    //   map.removeControl(L.Routing.control());
    // }
  }, [map]);

  return null;
};

const Map = ({ data }) => {
  const { userInfo } = useAuth();
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
  const waypoints = [
    L.latLng(data?.pickUpGeoCode?.lat, data?.pickUpGeoCode?.lan),
    L.latLng(data?.dropGeoCode?.lat, data?.dropGeoCode?.lan),
  ];
  const markers = [
    {
      geocode: [data?.pickUpGeoCode?.lat, data?.pickUpGeoCode?.lan],
      popup: data?.pickUpLocation,
    },
    {
      geocode: [data?.dropGeoCode?.lat, data?.dropGeoCode?.lan],
      popup: data?.dropLocation,
    },
    {
      geocode: [latitude, longitude],
      popup: userInfo?.displayName + "(You)",
    },
    // {
    //   geocode: [23.810561248496256, 90.4319548979279],
    //   popup: "Evercare Hospital Dhaka",
    // },
    // {
    //   geocode: [23.79567581916316, 90.40074219334419],
    //   popup: "Banani",
    // },
    // {
    //   geocode: [23.85140843128497, 90.37206385912916],
    //   popup: "World University of Bangladesh",
    // },
  ];
  return (
    <div>
      {/* {latitude && longitude && ( */}
      <MapContainer zoom={8}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DirectionMap waypoints={waypoints} />
        {markers?.map((marker) => (
          <Marker position={marker?.geocode} icon={customIcon}>
            <Popup>{marker?.popup}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* )} */}
    </div>
  );
};

export default Map;
