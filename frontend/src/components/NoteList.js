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
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NoteList;
