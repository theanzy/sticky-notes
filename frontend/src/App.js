import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';
import { saveNotes, getNotes } from './data/NotesData';
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

  const addNote = (content) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      date: date.toLocaleDateString(),
      content: content,
      color: 'yellow',
    };
    console.log(newNote);
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    saveNote(updatedNote);
  };
  const saveNote = (note) => {
    // save note to ...
    console.log('saving', note);
  };

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

  const filteredNotes = () => {
    return notes.filter((note) => {
      const div = document.createElement('div');
      div.innerHTML = note.content;
      const text = div.textContent || div.innerText || '';
      return text.toLocaleLowerCase().includes(searchText);
    });
  };
  return (
    <div className={darkModeOn ? 'dark-mode' : ''}>
      <div className='container'>
        <Header checked={darkModeOn} toggleDarkMode={setDarkModeOn} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={filteredNotes()}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleNoteUpdated={handleNoteUpdated}
        />
      </div>
    </div>
  );
}

export default App;
