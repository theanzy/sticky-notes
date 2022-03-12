import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import './DeleteModal.css';
const DeleteModal = ({ shown, title, subtitle, onDelete, onClosed }) => {
  return shown ? (
    <div className='modal-container' onClick={onClosed}>
      <div
        className='modal-content'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <MdOutlineClose onClick={onClosed} className='close' />
        <div className='title'>{title}</div>
        <div className='subtitle'>{subtitle}</div>
        <div>
          <button type='button' className='delete' onClick={onDelete}>
            Delete
          </button>
          <button type='button' className='cancel' onClick={onClosed}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteModal;
