import { useEffect, useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import debounce from 'lodash/debounce';
import Editor from './Editor/Editor';
import './Colors.css';
const Note = ({ note, handleDeleteNote, handleNoteUpdated, isDragging }) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];
  const [state, setState] = useState({ ...note });

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
    const newState = { ...state, content };
    setState(newState);
    debouncedSaveNote(newState);
  };

  const changeColor = (newColor) => {
    const newState = {
      ...state,
      color: newColor,
    };
    setState(newState);
    handleNoteUpdated(newState);
  };

  return (
    <div className={`note-container ${state.color}`}>
      <div className={`note-header ${state.color}-header`}>
        <MdClose
          onClick={() => handleDeleteNote(state.id)}
          className='md-icon'
          size='1.3em'
        />
        <MeatBallMenu
          onSelectedItem={changeColor}
          items={items}
          selectedItem={state.color}
        />
      </div>
      {!isDragging && (
        <div>
          <Editor htmlContent={state.content} onContentChange={updateContent} />
          <div className='note-footer'>
            Last updated on <small>{state.updatedDate}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
