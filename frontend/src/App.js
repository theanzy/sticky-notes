import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';
import { saveNotes, getNotes } from './data/NotesData';
import debounce from 'lodash/debounce';
import { getDarkMode, saveDarkMode } from './data/DarkModeData';

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

  const handleNoteUpdated = (note) => {
    setNotes([...notes.filter((_note) => _note.id !== note.id), note]);
    debouncedSaveNote(note);
  };
  const saveNote = (note) => {
    // save note to ...
    console.log('saving', note);
  };

  const debouncedSaveNote = useMemo(() => debounce(saveNote, 500), []);
  useEffect(() => {
    return () => {
      debouncedSaveNote.cancel();
    };
  }, []);

  useEffect(() => {
    const loadDarkMode = async () => {
      const darkModeLoaded = await getDarkMode();
      if (darkModeLoaded) {
        setDarkModeOn(darkModeLoaded);
      }
    };
    loadDarkMode();
  }, []);
  useEffect(() => {
    const storeDarkMode = async () => {
      await saveDarkMode(darkModeOn);
    };
    storeDarkMode();
  }, [darkModeOn]);

  return (
    <div className={darkModeOn ? 'dark-mode' : ''}>
      <div className='container'>
        <Header checked={darkModeOn} toggleDarkMode={setDarkModeOn} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLocaleLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleNoteUpdated={handleNoteUpdated}
        />
      </div>
    </div>
  );
}

export default App;
