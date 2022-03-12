import React, { useEffect, useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import debounce from 'lodash/debounce';
import Editor from './Editor/Editor';
import './Colors.css';
import { useDrag } from 'react-dnd';
import { DragTypes } from '../data/Constants';
import DeleteModal from './Modal/DeleteModal';
const Note = ({ note, handleDeleteNote, handleNoteUpdated }) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  const debouncedSaveNote = useMemo(
    () => debounce(handleNoteUpdated, 1500),
    [handleNoteUpdated]
  );

  const [{ opacity }, dragRef] = useDrag({
    type: DragTypes.Note,
    item: { noteId: note.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.7 : 1.0,
    }),
  });

  useEffect(() => {
    return () => {
      debouncedSaveNote.cancel();
    };
  }, [debouncedSaveNote]);

  const updateContent = (content) => {
    const newNote = { ...note, content };
    debouncedSaveNote(newNote);
  };

  const changeColor = (newColor) => {
    const newNote = {
      ...note,
      color: newColor,
    };
    handleNoteUpdated(newNote);
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
        <Editor htmlContent={note.content} onContentChange={updateContent} />
        <div className='note-footer'>
          Last updated on <small>{note.updatedDate}</small>
        </div>
      </div>
    </div>
  );
};

export default Note;
