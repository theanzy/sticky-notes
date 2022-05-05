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

  const handleFocusOut = () => {
    // Note onBlur() triggers a setState() hook. Causing it to ignore the checkmark click
    if (selectedItemId !== item.id) {
      setState({
        readOnly: true,
        text: item.name,
      });
    }
  };

  const handleItemClick = () => {
    onItemSelected(item);
  };

  const handleTextChanged = (e) => {
    const text = e.target.value;
    setState((prev) => ({ ...prev, text }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name !== state.text) {
      onValueChanged(state.text);
    }
    setState((prev) => ({ ...prev, readOnly: true }));
  };

  const handleCancelClicked = () => {
    setState({ text: item.name, readOnly: true });
  };

  const handleDeleteClicked = () => {
    inputRef.current.focus();
    setState((prev) => ({ ...prev, readOnly: false }));
  };

  return (
    <div
      key={item.id}
      className={`item-container ${isDraggingOver ? 'dragging-over' : ''}`}
      ref={dropRef}>
      <form
        className={`item ${selectedItemId === item.id ? 'active' : ''}`}
        onClick={handleItemClick}
        onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className='item-text'
          onBlur={handleFocusOut}
          onChange={handleTextChanged}
          value={state.text}
          readOnly={state.readOnly}
        />
        {!state.readOnly && selectedItemId === item.id ? (
          <Fragment>
            <MdOutlineCheck
              className='item-icon'
              size={'1.5rem'}
              onClick={handleSubmit}
            />
            <MdOutlineClose
              className='item-icon'
              size={'1.5rem'}
              onClick={handleCancelClicked}
            />
          </Fragment>
        ) : (
          <Fragment>
            <MdOutlineEdit
              className='item-icon'
              size={'1.5rem'}
              onClick={handleDeleteClicked}
            />
            <MdOutlineDeleteForever
              className='item-icon'
              size={'1.5rem'}
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
      </form>
    </div>
  );
};

export default EditableItem;
