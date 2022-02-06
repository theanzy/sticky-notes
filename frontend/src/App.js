import { useState } from 'react';
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import Search from './components/Search';

function App() {
  const [notes, setNotes] = useState([
    { id: nanoid(), text: 'this is my first note', date: '15/04/2021' },
    { id: nanoid(), text: 'this is my second note', date: '16/04/2021' },
    { id: nanoid(), text: 'this is my third note', date: '17/04/2021' },
    { id: nanoid(), text: 'this is my fourth note', date: '18/04/2021' },
  ]);

  const [searchText, setSearchText] = useState(['']);
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      date: date.toLocaleDateString(),
      text: text,
    };
    setNotes([...notes, newNote]);
  };
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className='container'>
      <Search handleSearchNote={setSearchText} />
      <NoteList
        notes={notes.filter((note) =>
          note.text.toLocaleLowerCase().includes(searchText)
        )}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
  );
}

export default App;
