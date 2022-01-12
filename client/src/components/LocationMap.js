import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const LocationMap = ({ center, zoom, coordinates, pathname }) => {
  let destinationMarkers = [];
  if (coordinates) {
    destinationMarkers = coordinates.map((location) => {
      const locationPopup = pathname ? (
        <Popup>
          <Link to={`${pathname}/${location.slug}`}>{location.name}</Link>
        </Popup>
      ) : (
        <Popup>{location.name}</Popup>
      );
      return (
        <Marker position={location.coordinates} key={location.name}>
          {locationPopup}
        </Marker>
      );
    });
  }

  const ChangeView = ({ center }) => {
    // Center the map at new location
    const map = useMap();
    map.setView([center[0], center[1]]);
    return null;
  };

  return (
    <div className="map">
      <MapContainer
        center={center}
        // center={["36.00", "-95"]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "450px", width: "100%" }}
      >
        <ChangeView center={center} zoom={14} />
        <TileLayer
          //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        {destinationMarkers}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
