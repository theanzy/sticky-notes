import React, { useRef, useState } from 'react';
import { MdClose, MdOutlineSave } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import Editor from './Editor/Editor';
import './Colors.css';
import { useDrag } from 'react-dnd';
import { DragTypes } from '../data/Constants';
import DeleteModal from './Modal/DeleteModal';
import DragPlaceholder from './Dragging/DragPlaceholder';

const Note = ({ note, handleDeleteNote, handleNoteUpdated }) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);

  const [{ opacity, isDragging }, dragRef] = useDrag({
    type: DragTypes.Note,
    item: { noteId: note.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.7 : 1.0,
    }),
  });
  const modalRef = useRef();

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleSaveNote = () => {
    handleNoteUpdated({
      ...note,
      content,
      color,
    });
  };

  return (
    <div
      className={`note-content ${color}`}
      style={{ opacity: opacity, height: '60vh' }}>
      <DeleteModal
        modalRef={modalRef}
        title='Delete note'
        subtitle='Are you sure to delete this note?'
        shown={showModal}
        onClosed={toggleShowModal}
        onDelete={() => handleDeleteNote(note.id)}
      />
      <div ref={dragRef} className={`note-header ${color}-header`}>
        <MdClose onClick={toggleShowModal} className='md-icon' size='1.3rem' />
        <MeatBallMenu
          onSelectedItem={(item) => setColor(item)}
          items={items}
          selectedItem={color}
        />
      </div>
      {isDragging ? (
        <DragPlaceholder />
      ) : (
        <Editor
          htmlContent={content}
          onContentChange={(value) => setContent(value)}
        />
      )}
      <div onClick={handleSaveNote} className='save-btn'>
        <MdOutlineSave className='save-icon' />
      </div>
    </div>
  );
};

export default Note;
