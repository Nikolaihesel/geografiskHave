import React from 'react';
import inputStyle from '../../../../assets/styles/components/modules/Inputs/_inputs.module.scss';

function AudioInput({ setAudio }) {
  const handleAudioChange = (e) => {
    const selectedAudio = e.target.files[0];
    setAudio(selectedAudio);
  };

  return (
    <div className={inputStyle.inputContainer}>
      <label>Audio Files</label>
      <input
        type='file'
        onChange={handleAudioChange}
      />
      <button>Add Additional Audio File</button>
    </div>
  );
}

export default AudioInput;