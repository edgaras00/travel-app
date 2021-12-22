import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LocationMap = ({ lat, lon, zoom, coordinates, pathname }) => {
  const destinationMarkers = Object.keys(coordinates).map((destination) => {
    const destinationPopup = pathname ? (
      <Popup>
        <Link to={`${pathname}/${destination}`}>{destination}</Link>
      </Popup>
    ) : (
      <Popup>{destination}</Popup>
    );
    return (
      <Marker position={coordinates[destination]}>
        {/* <Popup>
          <Link to={`${pathname}/${destination}`}>{destination}</Link>
        </Popup> */}
        {destinationPopup}
      </Marker>
    );
  });

  return (
    <div className="map">
      <MapContainer
        center={[lat, lon]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "450px", width: "100%" }}
      >
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
