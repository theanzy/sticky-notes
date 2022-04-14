import React from 'react';
import './ListMenuItems.css';
import './ColorBox';
import ColorBox from './ColorBox';
const ListMenuItems = ({ items, onSelectedClick, selectedItem }) => {
  return (
    <div className='list-menu-items'>
      {items.map((item) => (
        <div key={item} className='menu-item'>
          <input
            data-color={item}
            id={item}
            type='radio'
            name='items'
            value={item}
          />
          <div
            data-color={item}
            htmlFor={item}
            onClick={() => onSelectedClick(item)}>
            <ColorBox color={item} selectedColor={selectedItem} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListMenuItems;
