import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import Editor from './Editor/Editor';
import './Colors.css';
import { useDrag } from 'react-dnd';
import { DragTypes } from '../data/Constants';
import DeleteModal from './Modal/DeleteModal';
import useDebounce from './Hooks/useDebounce';
const Note = ({ note, handleDeleteNote, handleNoteUpdated }) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const [noteContent, setNoteContent] = useState(note.content);
  useDebounce(
    () => handleNoteUpdated({ ...note, content: noteContent }),
    2000,
    [noteContent]
  );

  const [{ opacity }, dragRef] = useDrag({
    type: DragTypes.Note,
    item: { noteId: note.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.7 : 1.0,
    }),
  });

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
    <div className={`note-content ${note.color}`} style={{ opacity }}>
      <DeleteModal
        title='Delete note'
        subtitle='Are you sure to delete this note?'
        shown={showModal}
        onClosed={toggleShowModal}
        onDelete={() => handleDeleteNote(note.id)}
      />
      <div ref={dragRef} className={`note-header ${note.color}-header`}>
        <MdClose onClick={toggleShowModal} className='md-icon' size='1.3em' />
        <MeatBallMenu
          onSelectedItem={changeColor}
          items={items}
          selectedItem={note.color}
        />
      </div>
      <div>
        <Editor htmlContent={noteContent} onContentChange={updateContent} />
        <div className='note-footer'>
          Last updated on <small>{note.updatedDate}</small>
        </div>
      </div>
    </div>
  );
};

export default Note;
