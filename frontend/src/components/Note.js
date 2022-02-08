import { MdDeleteForever } from 'react-icons/md';
const Note = ({ id, text, date, handleDeleteNote }) => {
  return (
    <div className='note'>
      <textarea rows='8' cols='10'>
        {text}
      </textarea>
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
