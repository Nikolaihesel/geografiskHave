import React from 'react';
import inputStyle from '../../../../assets/styles/components/modules/Inputs/_inputs.module.scss';

function TitleInput({ title, setTitle }) {
  return (
    <div className={inputStyle.inputContainer}>
      <label>Title</label>
      <input
        type='text'
        placeholder='Enter the story title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default TitleInput;