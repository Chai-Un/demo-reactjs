import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { getLocations } from "../../services/calculator-service";

const libraries = ["places"];
const mapContainerStyle = {
  height: "80vh",
  width: "100%"
};
const options = {
  disableDefaultUI: true,
  zoomControl: false
};
const center = {
  lat: 13.7423522,
  lng: 100.5498083
};

export default function MapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC0JsHIttDgHoVilzwQ0CPjGdhFgSYf2n0",
    libraries
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const getListLocations = useCallback(async () => {
    try {
      const listMarkers = [];
      const res = await getLocations();
      console.log(res);
      res.map((e) => {
        listMarkers.push({
          lat: e.lat,
          lng: e.long,
          max_dist: e.max_dist,
          name: e.name
        });
      });
      setMarkers(listMarkers);
    } catch (errors) {
      console.log(errors);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    getListLocations();
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: "https://www.clubphysical.co.nz/wp-content/uploads/2016/11/google-maps-hi.png",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(20, 35)
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h3>{selected.name}</h3>
              <div>
                Max units: <span>{selected.max_dist}</span>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
