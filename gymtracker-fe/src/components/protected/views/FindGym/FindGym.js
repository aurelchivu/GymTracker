import React, { useState, useEffect } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

export default function Maps() {
  const [currentPosition, setCurrentPosition] = useState({ lat: 44.43, lng: 26.1 });

  const { REACT_GOOGLE_MAPS_URL_KEY } = process.env;

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setCurrentPosition({lat: position.coords.latitude, lng: position.coords.longitude});
  //   });
  // } else {
  //   window.alert('dddd')
  // }

  const CustomSkinMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={currentPosition}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: [
            {
              featureType: 'water',
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { hue: '#0088ff' },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [
                { hue: '#ff0000' },
                { saturation: -100 },
                { lightness: 99 },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#808080' }, { lightness: 54 }],
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ece2d9' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ccdca1' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#767676' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }],
            },
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry.fill',
              stylers: [{ visibility: 'on' }, { color: '#b8cb93' }],
            },
            { featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.sports_complex',
              stylers: [{ visibility: 'on' }],
            },
            { featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'simplified' }],
            },
          ],
        }}
      >
        <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
      </GoogleMap>
    ))
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
      });
    }
  }, []);

  return (
    <>
      <CustomSkinMap
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDx6QiNmIC4DwCVzAwXaOD8On1Q71khDdc'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
  );
}
