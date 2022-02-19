import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';
import { saveNotes, getNotes, getFolders, saveFolders } from './data/NotesData';
import { getDarkMode, saveDarkMode } from './data/DarkModeData';
import SidePane from './components/SidePane/SidePane';

function App() {
  const [notes, setNotes] = useState([]);
  const [folderState, setFolderState] = useState({
    folders: [],
    selectedFolderId: '',
  });
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

  useEffect(() => {
    const fetchFolders = async () => {
      const savedFolders = await getFolders();
      if (savedFolders) {
        setFolderState({ ...folderState, folders: savedFolders });
      }
    };
    fetchFolders();
  }, []);

  useEffect(() => {
    const storeFolders = async () => {
      await saveFolders(folderState.folders);
    };
    storeFolders();
  }, [folderState.folders]);

  const addNote = (content) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      date: date.toLocaleDateString(),
      content: content,
      color: 'yellow',
      folderId: folderState.selectedFolderId,
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
      return (
        text.toLocaleLowerCase().includes(searchText) &&
        (folderState.selectedFolderId.length > 0
          ? note.folderId === folderState.selectedFolderId
          : true)
      );
    });
  };

  const foldersChanged = (updatedFolder) => {
    const folders = folderState.folders.map((folder) =>
      folder.id === updatedFolder.id ? updatedFolder : folder
    );
    return folders;
  };

  const addNewFolder = (folderName) => {
    const date = new Date();
    const newFolder = {
      id: nanoid(),
      name: folderName,
      date: date.toLocaleDateString(),
    };
    const folders = [...folderState.folders, newFolder];
    setFolderState({ folders: folders, selectedFolderId: newFolder.id });
  };

  const handleSearchNote = (text) => {
    setFolderState({ ...folderState, selectedFolderId: '' });
    setSearchText(text);
  };

  const handleDeleteFolder = (folder) => {
    setFolderState((_folderState) => {
      return {
        ..._folderState,
        folders: _folderState.folders.filter(
          (folder_) => folder_.id !== folder.id
        ),
      };
    });
    setNotes((notes) =>
      notes.map((note) =>
        note.folderId === folder.id ? { ...note, folderId: '' } : note
      )
    );
  };

  return (
    <div className={`container ${darkModeOn ? 'dark-mode' : ''}`}>
      <div className='side'>
        <SidePane
          items={folderState.folders}
          selectedItemId={folderState.selectedFolderId}
          selectedItemUpdated={(item) =>
            setFolderState({
              folders: foldersChanged(item),
              selectedFolderId: item.id,
            })
          }
          handleAddItem={addNewFolder}
          handleDeleteItem={handleDeleteFolder}
          showAllItems={() =>
            setFolderState({ ...folderState, selectedFolderId: '' })
          }
        />
      </div>
      <div className='main'>
        <Header checked={darkModeOn} toggleDarkMode={setDarkModeOn} />
        <Search handleSearchNote={handleSearchNote} />
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
