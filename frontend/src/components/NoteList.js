import AddNote from './AddNote';
import Note from './Note';
import React from 'react';
const NoteList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleNoteUpdated,
}) => {
  return (
    <div className='notes-list'>
      <AddNote handleAddNote={handleAddNote} />
      {notes.map((note) => (
        <div key={note.id} className='note'>
          <Note
            draggable
            note={note}
            handleDeleteNote={handleDeleteNote}
            handleNoteUpdated={handleNoteUpdated}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
