import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import mapStyles from './mapStyles';

const { REACT_APP_GOOGLE_MAPS_URL_KEY } = process.env;

export default function Maps() {

  const [currentPosition, setCurrentPosition] = useState({
    lat: null,
    lng: null,
  });

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
  }, []);

  const Map = () => {
    
    const [gyms, setGyms] = useState([]);
    const [selectedGym, setSelectedGym] = useState(null);

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
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     setCurrentPosition({
      //       lat: position.coords.latitude,
      //       lng: position.coords.longitude,
      //     });
      //     console.log('Position :', currentPosition);
      //     console.log('Latitude is :', position.coords.latitude);
      //     console.log('Longitude is :', position.coords.longitude);
      //   });
      // } else {
      //   window.alert('Location not found');
      // }

      if (currentPosition.lat !== null ) {
        findGymNearMe();
      }
      const listener = (e) => {
        if (e.key === 'Escape') {
          setSelectedGym(null);
        }
      };
      window.addEventListener('keydown', listener);

      return () => {
        window.removeEventListener('keydown', listener);
      };
    }, []);

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={currentPosition}
        defaultOptions={{
          styles: mapStyles,
          scrollwheel: true,
          zoomControl: true,
        }}
      >
        {gyms.map((gym) => (
          <Marker
            key={gym.place_id}
            position={{
              lat: gym.geometry.location.lat,
              lng: gym.geometry.location.lng,
            }}
            onClick={() => {
              setSelectedGym(gym);
            }}
            icon={{
              url: '/gymIcon.png',
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}

        {selectedGym && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedGym(null);
            }}
            position={{
              lat: selectedGym.geometry.location.lat,
              lng: selectedGym.geometry.location.lng,
            }}
          >
            <div className='infoWindow'>
              <h4>{selectedGym.name}</h4>
              <p>{selectedGym.formatted_address}</p>
            </div>
          </InfoWindow>
        )}
        <Marker position={currentPosition} />
      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));
  return (
    <>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_URL_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
  );
}
