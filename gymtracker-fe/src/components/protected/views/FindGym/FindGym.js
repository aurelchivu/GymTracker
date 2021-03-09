import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Map,
} from 'react-google-maps';
import mapStyles from './mapStyles';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default function Maps() {
  const [currentPosition, setCurrentPosition] = useState({
    lat: null,
    lng: null,
  });

  const [gyms, setGyms] = useState([]);

  const { REACT_APP_GOOGLE_MAPS_URL_KEY } = process.env;
  const googleMapURL =
    `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_URL_KEY}`;

  const CustomSkinMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={currentPosition}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: mapStyles,
        }}
      >
        
        <Marker position={currentPosition} />
      </GoogleMap>
      
    ))
  );

  const findGymNearMe = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/findgym?location=${currentPosition.lat},${currentPosition.lng}&radius=10000&type=gym&keyword=near&key=${REACT_APP_GOOGLE_MAPS_URL_KEY}`
      );

      console.log(data);
      setGyms(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log('Position :', currentPosition);
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
      });
    } else {
      window.alert('Location not found');
    }
    findGymNearMe();
  }, [currentPosition]);

  return (
    <>
      <CustomSkinMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
  );
}
