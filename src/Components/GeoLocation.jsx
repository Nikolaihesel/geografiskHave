import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

class GeoLocation extends React.Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyBGiffY66LGH3WExLsMgiGKKhv5Admu47M"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default GeoLocation;