import React from 'react';

import './radio-input.styles.css';

const RadioInput = ({ id, name, value, defaultChecked, label }) => {
  return (
    <div className="option">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />
      <span className="custom-radio"></span>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioInput;
