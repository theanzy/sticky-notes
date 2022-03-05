import { useEffect, useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import debounce from 'lodash/debounce';
import Editor from './Editor/Editor';
import './Colors.css';
const Note = ({ note, handleDeleteNote, handleNoteUpdated, isDragging }) => {
  console.log('note render');
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];

  const debouncedSaveNote = useMemo(
    () => debounce(handleNoteUpdated, 1500),
    [handleNoteUpdated]
  );

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
    <div className={`note-container ${note.color}`}>
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
      {!isDragging && (
        <div>
          <Editor htmlContent={note.content} onContentChange={updateContent} />
          <div className='note-footer'>
            Last updated on <small>{note.updatedDate}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
