import { useEffect, useMemo, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import debounce from 'lodash/debounce';
import './Colors.css';
const Note = ({
  id,
  text,
  date,
  color,
  handleDeleteNote,
  handleNoteUpdated,
}) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];
  const [noteText, setNoteText] = useState(text);

  const updateText = (text) => {
    setNoteText(text);
    debouncedSaveNote({
      id: id,
      date: date,
      text: noteText,
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
      text: noteText,
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
      <textarea
        rows='8'
        cols='10'
        value={noteText}
        onChange={(event) => updateText(event.target.value)}
      />
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
