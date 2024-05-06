import React from 'react';
import inputStyle from '../../../../assets/styles/components/modules/Inputs/_inputs.module.scss';

function MarkerTextInput({ markerText, setMarkerText }) {
  return (
    <div className={inputStyle.inputContainer}>
      <label>Marker Text</label>
      <input
        type='text'
        placeholder='Enter marker text'
        value={markerText}
        onChange={(e) => setMarkerText(e.target.value)}
      />
    </div>
  );
}

export default MarkerTextInput;