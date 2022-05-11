import React from 'react';
import { createPortal } from 'react-dom';
import { MdOutlineClose } from 'react-icons/md';
import './DeleteModal.css';

const DeleteModal = ({
  modalRef,
  shown,
  title,
  subtitle,
  onDelete,
  onClosed,
}) => {
  if (!shown) {
    return null;
  }
  console.log(modalRef);
  return createPortal(
    <>
      <div className='modal-overlay' onClick={() => onClosed()} />
      <div className='modal-container' ref={modalRef}>
        <MdOutlineClose
          onClick={onClosed}
          fontSize={'1.3rem'}
          className='close'
        />
        <div className='title'>{title}</div>
        <div className='subtitle'>{subtitle}</div>
        <div className='btn-group'>
          <button
            type='button'
            className='delete'
            onClick={() => {
              onClosed();
              onDelete();
            }}>
            Delete
          </button>
          <button type='button' className='cancel' onClick={onClosed}>
            Cancel
          </button>
        </div>
      </div>
    </>,

    document.getElementById('portal')
  );
};

export default DeleteModal;
