import React from 'react';
import './ColorBox.css';
import '../Colors.css';
const ColorBox = ({ color, selectedColor }) => {
  return (
    <div
      data-color={color}
      className={`color-box ${color} ${
        selectedColor === color ? 'highlight' : ''
      }`}></div>
  );
};
export default ColorBox;
