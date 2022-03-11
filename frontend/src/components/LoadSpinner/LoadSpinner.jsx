import React from 'react';
import './LoadSpinner.css';
const LoadSpinner = ({ text }) => {
  return (
    <div className='loading-container'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='loading-text'>{text}</div>
    </div>
  );
};
export default LoadSpinner;
