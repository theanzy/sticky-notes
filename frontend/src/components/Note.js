import { useEffect, useMemo, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import debounce from 'lodash/debounce';
import Editor from './Editor/Editor';
import './Colors.css';
const Note = ({
  id,
  content,
  date,
  color,
  handleDeleteNote,
  handleNoteUpdated,
}) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];

  const updateContent = (content) => {
    debouncedSaveNote({
      id: id,
      date: date,
      content: content,
      color: color,
    });
  };

  const debouncedSaveNote = useMemo(() => debounce(handleNoteUpdated, 500), []);
  useEffect(() => {
    return () => {
      debouncedSaveNote.cancel();
    };
  }, []);

  const changeColor = (newColor) => {
    handleNoteUpdated({
      id: id,
      date: date,
      content: content,
      color: newColor,
    });
  };

  return (
    <div className={`note ${color}`}>
      <div className={`note-header ${color}-header`}>
        <div></div>
        <MeatBallMenu
          onSelectedItem={changeColor}
          items={items}
          selectedItem={color}
        />
      </div>
      <Editor htmlContent={content} onContentChange={updateContent} />
      <div className='note-footer'>
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className='delete-icon'
          size='1.3em'
        />
      </div>
    </div>
  );
};

export default Note;
