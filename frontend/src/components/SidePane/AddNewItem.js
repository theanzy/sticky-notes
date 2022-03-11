import './SidePane.css';
import React, { useState } from 'react';
import { MdOutlineCreateNewFolder } from 'react-icons/md';

const AddNewItem = ({ onAddNewItem }) => {
  const [inputText, setInputText] = useState('');

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      onAddNewItem(inputText);
      setInputText('');
    }
  };

  return (
    <div className='add-new-item'>
      <input
        type='text'
        value={inputText}
        placeholder='Add new folder'
        className='new-item-text'
        onKeyUp={onKeyUp}
        onChange={(e) => setInputText(e.target.value)}
      />
      <MdOutlineCreateNewFolder
        className='clickable'
        size={20}
        onClick={() => {
          onAddNewItem(inputText);
          setInputText('');
        }}
      />
    </div>
  );
};

export default AddNewItem;
