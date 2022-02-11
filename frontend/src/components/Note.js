import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
const Note = ({ id, text, date, handleDeleteNote, handleNoteUpdated }) => {
  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      id: id,
      text: text,
      date: date,
    });
  }, []);

  const updateText = (text) => {
    setState({
      ...state,
      text: text,
    });
    handleNoteUpdated(state);
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <div></div>
        <MeatBallMenu />
      </div>
      <textarea
        rows='8'
        cols='10'
        value={state.text}
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
