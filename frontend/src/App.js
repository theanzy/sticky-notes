import { useEffect, useState, useMemo } from 'react';
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';
import { saveNotes, getNotes } from './data/NotesData';
import debounce from 'lodash/debounce';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkModeOn, setDarkModeOn] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getNotes();
      if (savedNotes) {
        setNotes(savedNotes);
      }
    };
    fetchNotes();
  }, []);
  useEffect(() => {
    const storeNotes = async () => {
      await saveNotes(notes);
    };
    storeNotes();
  }, [notes]);

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

  const updateText = (id, text) => {
    console.log(id, text);
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          note.text = text;
          debouncedUpdateNote(note);
        }
        return note;
      })
    );
  };

  const updateNote = (note) => {
    // save note to ...
  };

  const debouncedUpdateNote = useMemo(() => debounce(updateNote, 500), []);
  useEffect(() => {
    return () => {
      debouncedUpdateNote.cancel();
    };
  }, []);

  return (
    <div className={darkModeOn ? 'dark-mode' : ''}>
      <div className='container'>
        <Header toggleDarkMode={setDarkModeOn} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLocaleLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleTextUpdated={updateText}
        />
      </div>
    </div>
  );
}

export default App;
