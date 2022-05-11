import React, { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import Editor from './Editor/Editor';
import './Colors.css';
import { useDrag } from 'react-dnd';
import { DragTypes } from '../data/Constants';
import DeleteModal from './Modal/DeleteModal';
import useDebounce from './Hooks/useDebounce';
import DragPlaceholder from './Dragging/DragPlaceholder';

const Note = ({ note, handleDeleteNote, handleNoteUpdated }) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];
  const [showModal, setShowModal] = useState(false);
  const [noteContent, setNoteContent] = useState(note.content);

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

  useDebounce(
    () => handleNoteUpdated({ ...note, content: noteContent }),
    2000,
    [noteContent]
  );

  const updateContent = (content) => {
    setNoteContent(content);
  };

  const changeColor = (newColor) => {
    if (newColor !== note.color) {
      handleNoteUpdated({
        ...note,
        color: newColor,
      });
    }
  };

  return (
    <div
      className={`note-content ${note.color}`}
      style={{ opacity: opacity, height: '60vh' }}>
      <DeleteModal
        modalRef={modalRef}
        title='Delete note'
        subtitle='Are you sure to delete this note?'
        shown={showModal}
        onClosed={toggleShowModal}
        onDelete={() => handleDeleteNote(note.id)}
      />
      <div ref={dragRef} className={`note-header ${note.color}-header`}>
        <MdClose onClick={toggleShowModal} className='md-icon' size='1.3rem' />
        <MeatBallMenu
          onSelectedItem={changeColor}
          items={items}
          selectedItem={note.color}
        />
      </div>
      <div style={{ display: 'flex', height: '55vh' }}>
        {isDragging ? (
          <DragPlaceholder />
        ) : (
          <Editor htmlContent={noteContent} onContentChange={updateContent} />
        )}

        <div className='note-footer'>
          Last updated on <small>{note.updatedDate}</small>
        </div>
      </div>
    </div>
  );
};

export default Note;
