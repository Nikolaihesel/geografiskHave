import React from 'react';
import inputStyle from '../../../../assets/styles/components/modules/Inputs/_inputs.module.scss';

function MarkerLocationManager({ markerLocations, setMarkerLocations }) {
  const handleMarkerLocationChange = (e, index, key) => {
    const updatedLocations = [...markerLocations];
    updatedLocations[index][key] = e.target.value;
    setMarkerLocations(updatedLocations);
  };

  return (
    <>
      {markerLocations.map((location, index) => (
        <div
          className={inputStyle.inputContainer}
          key={index}>
          <label>Longitude</label>
          <input
            type='text'
            value={location.lng}
            onChange={(e) => handleMarkerLocationChange(e, index, 'lng')}
          />
          <label>Latitude</label>
          <input
            type='text'
            value={location.lat}
            onChange={(e) => handleMarkerLocationChange(e, index, 'lat')}
          />
        </div>
      ))}
    </>
  );
}

export default MarkerLocationManager;