import AddNote from './AddNote';
import Note from './Note';

const NoteList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleTextUpdated,
}) => {
  return (
    <div className='notes-list'>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
          handleTextUpdated={handleTextUpdated}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NoteList;
