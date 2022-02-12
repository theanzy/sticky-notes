import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
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
  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      id: id,
      text: text,
      date: date,
      color: color,
    });
  }, []);

  useEffect(() => {
    handleNoteUpdated(state);
  }, [state]);

  const updateText = (text) => {
    setState({
      ...state,
      text: text,
    });
  };

  const changeColor = (newColor) => {
    console.log(state.text, newColor);
    setState({
      ...state,
      color: newColor,
    });
  };

  return (
    <div className={`note ${state.color}`}>
      <div className={`note-header ${state.color}-header`}>
        <div></div>
        <MeatBallMenu
          onSelectedItem={changeColor}
          items={items}
          selectedItem={state.color}
        />
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
