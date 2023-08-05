import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
// import MarkerIcon from "../../../assets/Marker.png";
// import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

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

  // useEffect(() => {
  //   if (map !== null) {
  //     // Clear previous directions before adding new ones
  //     map.eachLayer((layer) => {
  //       if (layer instanceof L.Routing.Control) {
  //         map.removeControl(layer);
  //       }
  //     });
  //   }
  // }, [map]);

  // // Add the routing control with the specified waypoints
  // L.Routing.control({
  //   waypoints,
  //   createMarker: () => null, // Hide markers
  //   routeWhileDragging: true,
  //   addWaypoints: false, // Do not allow adding new waypoints
  //   showAlternatives: false, // Hide alternative routes
  //   router: new L.Routing.OSRMv1({
  //     serviceUrl: "https://router.project-osrm.org/route/v1",
  //   }),
  // }).addTo(map);

  return null;
};

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
    {
      geocode: [23.810561248496256, 90.4319548979279],
      popup: "Evercare Hospital Dhaka",
    },
    {
      geocode: [23.79567581916316, 90.40074219334419],
      popup: "Banani",
    },
    {
      geocode: [23.85140843128497, 90.37206385912916],
      popup: "World University of Bangladesh",
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
  console.log(latitude, longitude);
  const waypoints = [
    L.latLng(23.810561248496256, 90.4319548979279), // Berlin
    L.latLng(23.79567581916316, 90.40074219334419), // Paris
    L.latLng(23.85140843128497, 90.37206385912916), // London
  ];
  return (
    <div>
      {latitude && longitude && (
        <MapContainer center={[latitude, longitude]} zoom={8}>
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
      )}
    </div>
  );
};

export default Map;

// import React from "react";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-routing-machine";

// const DirectionMap = ({ waypoints }) => {
//   const map = useMap();

//   // Clear previous directions before adding new ones
//   map.eachLayer((layer) => {
//     if (layer instanceof L.Routing.Control) {
//       map.removeControl(layer);
//     }
//   });

//   // Add the routing control with the specified waypoints
//   L.Routing.control({
//     waypoints,
//   }).addTo(map);

//   return null;
// };

// const MapWithDirections = () => {
//   // Example waypoints (latitude and longitude)
//   const waypoints = [
//     L.latLng(52.52, 13.405), // Berlin
//     L.latLng(48.8566, 2.3522), // Paris
//     L.latLng(51.5074, -0.1278), // London
//   ];

//   return (
//     <div>
//       <MapContainer
//         center={[51.505, -0.09]}
//         zoom={6}
//         style={{ width: "500px", height: "400px" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <DirectionMap waypoints={waypoints} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapWithDirections;
