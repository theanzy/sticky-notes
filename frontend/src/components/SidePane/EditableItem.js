import React, { useRef, useState } from 'react';
import './SidePane.css';
import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineCheck,
  MdOutlineClose,
} from 'react-icons/md';
const EditableItem = ({
  selectedItemId,
  item,
  onItemSelected,
  onItemDeleted,
  onValueChanged,
}) => {
  const [state, setState] = useState({ readOnly: true, text: item.name });
  const inputRef = useRef(undefined);
  return (
    <div
      className={`item ${selectedItemId === item.id ? 'active' : ''}`}
      onClick={() => {
        onItemSelected(item);
        inputRef.current.focus();
      }}>
      <input
        ref={inputRef}
        className='item-text'
        onChange={(e) => setState({ ...state, text: e.target.value })}
        value={state.text}
        readOnly={state.readOnly}
      />
      {!state.readOnly && selectedItemId === item.id ? (
        <>
          <MdOutlineCheck
            className='item-icon'
            size={20}
            onClick={() => {
              if (item.name !== state.text) {
                onValueChanged(state.text);
              }
              setState({ ...state, readOnly: true });
            }}
          />
          <MdOutlineClose
            className='item-icon'
            size={20}
            onClick={() => {
              setState({ ...state, text: item.name, readOnly: true });
            }}
          />
        </>
      ) : (
        <>
          {' '}
          <MdOutlineEdit
            className='item-icon'
            size={20}
            onClick={() => {
              setState({ ...state, readOnly: false });
            }}
          />
          <MdOutlineDeleteForever
            className='item-icon'
            size={20}
            onClick={onItemDeleted}
          />
        </>
      )}
    </div>
  );
};

export default EditableItem;
