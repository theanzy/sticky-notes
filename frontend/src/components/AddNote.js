import { useState } from 'react';
const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState('');
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setNoteText(newText);
  };

  const handleSave = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText('');
    }
  };

  return (
    <div className='note new'>
      <textarea
        rows='8'
        cols='10'
        value={noteText}
        className='new'
        placeholder='Type to add a note...'
        onChange={handleTextChange}></textarea>
      <div className='note-footer'>
        <small></small>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
