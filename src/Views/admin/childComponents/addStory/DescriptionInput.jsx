import React from 'react';
import inputStyle from '../../../../assets/styles/components/modules/Inputs/_inputs.module.scss';

function DescriptionInput({ description, setDescription }) {
  return (
    <div className={inputStyle.inputContainer}>
      <label>Description</label>
      <input
        type='text'
        placeholder='Describe your story'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

export default DescriptionInput;