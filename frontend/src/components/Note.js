import { useEffect, useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import debounce from 'lodash/debounce';
import Editor from './Editor/Editor';
import './Colors.css';
const Note = ({ note, handleDeleteNote, handleNoteUpdated }) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];

  const updateContent = (content) => {
    debouncedSaveNote({
      ...note,
      content: content,
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
      ...note,
      color: newColor,
    });
  };

  return (
    <div className={`note ${note.color}`}>
      <div className={`note-header ${note.color}-header`}>
        <MdClose
          onClick={() => handleDeleteNote(note.id)}
          className='md-icon'
          size='1.3em'
        />
        <MeatBallMenu
          onSelectedItem={changeColor}
          items={items}
          selectedItem={note.color}
        />
      </div>
      <div className='note-header-2'>
        <small>{note.date}</small>
      </div>
      <Editor htmlContent={note.content} onContentChange={updateContent} />
    </div>
  );
};

export default Note;
