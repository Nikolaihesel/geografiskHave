import React from 'react';
import inputStyle from '../../../../assets/styles/components/modules/Inputs/_inputs.module.scss';

function FileInput({ setFile }) {
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className={inputStyle.inputContainer}>
      <label>Upload Image</label>
      <input
        type='file'
        onChange={handleChange}
      />
    </div>
  );
}

export default FileInput;