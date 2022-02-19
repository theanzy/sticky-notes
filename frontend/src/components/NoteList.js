import AddNote from './AddNote';
import Note from './Note';

const NoteList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleNoteUpdated,
}) => {
  return (
    <div className='notes-list'>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleDeleteNote={handleDeleteNote}
          handleNoteUpdated={handleNoteUpdated}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NoteList;
