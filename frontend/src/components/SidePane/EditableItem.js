import React, { Fragment, useState, useRef } from 'react';
import './SidePane.css';
import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineCheck,
  MdOutlineClose,
} from 'react-icons/md';
import { useDrop } from 'react-dnd';
import { DragTypes } from '../../data/Constants';
import DeleteModal from '../Modal/DeleteModal';
const EditableItem = ({
  selectedItemId,
  item,
  onItemSelected,
  onItemDeleted,
  onValueChanged,
  onDropItem,
}) => {
  const [state, setState] = useState({
    readOnly: true,
    text: item.name,
  });

  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const [{ isDraggingOver }, dropRef] = useDrop({
    accept: DragTypes.Note,
    drop: (dest) => {
      onDropItem({ folderId: item.id, noteId: dest.noteId });
    },
    collect: (monitor) => ({
      isDraggingOver: monitor.isOver(),
    }),
  });

  const onBlur = () => {
    // Note onBlur() triggers a setState() hook. Causing it to ignore the checkmark click
    if (selectedItemId !== item.id) {
      setState({
        readOnly: true,
        text: item.name,
      });
    }
  };

  return (
    <div
      key={item.id}
      className={`item-container ${isDraggingOver ? 'dragging-over' : ''}`}
      ref={dropRef}>
      <div
        className={`item ${selectedItemId === item.id ? 'active' : ''}`}
        onClick={() => {
          onItemSelected(item);
        }}>
        <input
          ref={inputRef}
          className='item-text'
          onBlur={onBlur}
          onChange={(e) => setState({ ...state, text: e.target.value })}
          value={state.text}
          readOnly={state.readOnly}
        />
        {!state.readOnly && selectedItemId === item.id ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <Fragment>
            <MdOutlineEdit
              className='item-icon'
              size={20}
              onClick={() => {
                inputRef.current.focus();
                setState({ ...state, readOnly: false });
              }}
            />
            <MdOutlineDeleteForever
              className='item-icon'
              size={20}
              onClick={toggleModal}
            />
            <DeleteModal
              shown={showModal}
              title='Delete folder'
              subtitle='Are you sure to delete folder?'
              onDelete={onItemDeleted}
              onClosed={toggleModal}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default EditableItem;
