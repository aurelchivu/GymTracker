import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import mapStyles from './mapStyles';

export default function Maps() {
  const [currentPosition, setCurrentPosition] = useState({
    lat: null,
    lng: null,
  });
  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);

  const { REACT_APP_GOOGLE_MAPS_URL_KEY } = process.env;

  const CustomSkinMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={currentPosition}
        defaultOptions={{
          scrollwheel: true,
          zoomControl: true,
          styles: mapStyles,
        }}
      >
        {gyms.map((gym) => (
          <Marker
            key={gym.place_id}
            position={{
              lat: gym.geometry.location.lat,
              lng: gym.geometry.location.lng,
            }}
            onMouseOver={() => {
              console.log(gym.name);
              console.log(gym.formatted_address);
              // setSelectedGym(gym);
            }}
            icon={{
              url: '/gymIcon.png',
              scaledSize: new window.google.maps.Size(26, 26),
            }}
          />
        ))}

        {(selectedGym && 
          <InfoWindow
            // onCloseClick={() => {
            //   setSelectedGym(null);
            // }}
            getContent
            position={{
              lat: selectedGym.geometry.location.lat,
              lng: selectedGym.geometry.location.lnt,
            }}
            content={
              <div>
                <h2>SELECTED</h2>
                <h2>{selectedGym.name}</h2>
                <p>{selectedGym.formatted_address}</p>
              </div>
            }
          >
            <div>
              <h2>SELECTED</h2>
              <h2>{selectedGym.name}</h2>
              <p>{selectedGym.formatted_address}</p>
            </div>
          </InfoWindow>
        )}
        <Marker position={currentPosition} />
      </GoogleMap>
    ))
  );

  const findGymNearMe = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/findgym?location=${currentPosition.lat},${currentPosition.lng}&radius=10000&type=gym&keyword=near&key=${REACT_APP_GOOGLE_MAPS_URL_KEY}`
      );

      console.log(data.data.results);
      setGyms(data.data.results);
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
    if (currentPosition.lat) {
      findGymNearMe();
    }
  }, [currentPosition]);

  return (
    <>
      <CustomSkinMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_URL_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
  );
}
