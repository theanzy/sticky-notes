import { useEffect, useReducer } from 'react';
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';
import {
  saveNotes,
  getNotes,
  getFolders,
  saveFolders,
  addFolder,
  deleteFolder,
  updateNote,
  deleteNote,
  addNote,
} from './data/NotesData';
import { getDarkMode, saveDarkMode } from './data/DarkModeData';
import SidePane from './components/SidePane/SidePane';
import { DragDropContext } from 'react-beautiful-dnd';
import LoadSpinner from './components/LoadSpinner/LoadSpinner';

const initialState = {
  darkModeOn: false,
  isLoading: true,
  isSaving: false,
  folders: [],
  selectedFolderId: '',
  notes: [],
  searchText: '',
};

const ActionTypes = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SAVING: 'SAVING',
  SAVE_ERROR: 'SAVE_ERROR',
  UPDATE_NOTES: 'UPDATE_NOTES',
  ADD_NEW_FOLDER: 'ADD_NEW_FOLDER',
  DELETE_FOLDER: 'DELETE_FOLDER',
  SELECTED_FOLDER_CHANGED: 'SELECTED_FOLDER_CHANGED',
  SEARCH: 'SEARCH',
  SHOW_ALL_NOTES: 'SHOW_ALL_NOTES',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        darkModeOn: action.payload.darkModeOn,
        folders: action.payload.folders,
        notes: action.payload.notes,
        isLoading: false,
      };
    case ActionTypes.SAVING:
      return {
        ...state,
        isSaving: true,
      };
    case ActionTypes.UPDATE_NOTES:
      return { ...state, notes: action.payload, isSaving: false };
    case ActionTypes.ADD_NEW_FOLDER:
      return {
        ...state,
        folders: action.payload.folders,
        selectedFolderId: action.payload.selectedFolderId,
        isSaving: false,
      };
    case ActionTypes.SEARCH:
      return {
        ...state,
        searchText: action.payload,
        selectedFolderId: '',
      };
    case ActionTypes.DELETE_FOLDER:
      return {
        ...state,
        folders: action.payload.folders,
        notes: action.payload.notes,
        selectedFolderId: action.payload.selectedFolderId,
        isSaving: false,
      };
    case ActionTypes.SELECTED_FOLDER_CHANGED:
      return {
        ...state,
        folders: action.payload.folders,
        selectedFolderId: action.payload.selectedFolderId,
      };
    case ActionTypes.SHOW_ALL_NOTES:
      return {
        ...state,
        selectedFolderId: '',
      };
    case ActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkModeOn: !state.darkModeOn,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchSavedState = async () => {
      const values = await Promise.all([
        getDarkMode(),
        getFolders(),
        getNotes(),
      ]);
      dispatch({
        type: ActionTypes.FETCH_SUCCESS,
        payload: {
          darkModeOn: values[0],
          folders: values[1],
          notes: values[2],
          isLoading: false,
        },
      });
    };
    fetchSavedState();
  }, []);

  const storeNotes = async (notes) => {
    console.log('saving all notes local', notes);
    await saveNotes(notes);
  };

  useEffect(() => {
    const storeFolders = async () => {
      await saveFolders(state.folders);
    };
    storeFolders();
  }, [state.folders]);

  const withSaveAsync = async (callback, ...args) => {
    dispatch({ type: ActionTypes.SAVING });
    await callback(args);
  };

  const updateNotesState = (notes) => {
    dispatch({ type: ActionTypes.UPDATE_NOTES, payload: notes });
    storeNotes(notes);
  };

  const handleAddNote = async (content) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      createdDate: date.toLocaleDateString(),
      updatedDate: date.toLocaleDateString(),
      content: content,
      color: 'yellow',
      folderId: state.selectedFolderId,
    };
    await withSaveAsync(addNote, newNote);
    updateNotesState([...state.notes, newNote]);
  };

  const handleDeleteNote = async (id) => {
    await withSaveAsync(deleteNote, id);
    const updatedNotes = state.notes.filter((note) => note.id !== id);
    updateNotesState(updatedNotes);
  };
  const handleNoteUpdated = async (updatedNote) => {
    console.log('handle note updated');
    const date = new Date();
    const noteToUpdate = {
      ...updatedNote,
      updatedDate: date.toLocaleDateString(),
    };
    await withSaveAsync(updateNote, noteToUpdate);
    updateNotesState(
      state.notes.map((note) =>
        note.id === noteToUpdate.id ? noteToUpdate : note
      )
    );
  };

  useEffect(() => {
    const storeDarkMode = async () => {
      await saveDarkMode(state.darkModeOn);
    };
    storeDarkMode();
  }, [state.darkModeOn]);

  const filteredNotes = () => {
    return state.notes.filter((note) => {
      const div = document.createElement('div');
      div.innerHTML = note.content;
      const text = div.textContent || div.innerText || '';
      return (
        text.toLocaleLowerCase().includes(state.searchText) &&
        (state.selectedFolderId.length > 0
          ? note.folderId === state.selectedFolderId
          : true)
      );
    });
  };

  const addNewFolder = async (folderName) => {
    const date = new Date();
    const newFolder = {
      id: nanoid(),
      name: folderName,
      date: date.toLocaleDateString(),
    };
    await withSaveAsync(addFolder, newFolder);
    const folders = [...state.folders, newFolder];
    dispatch({
      type: ActionTypes.ADD_NEW_FOLDER,
      payload: {
        folders: folders,
        selectedFolderId: newFolder.id,
      },
    });
  };

  const handleSearchNote = (text) => {
    dispatch({
      type: ActionTypes.SEARCH,
      payload: text,
    });
  };

  const selectNewFolderId = (currentId, deleteId) => {
    let newId = '';
    if (currentId !== deleteId && currentId.length > 0) {
      newId = currentId;
    }
    return newId;
  };

  const handleDeleteFolder = async (deletedFolder) => {
    await withSaveAsync(deleteFolder, deletedFolder);

    const folders = state.folders.filter(
      (folder_) => folder_.id !== deletedFolder.id
    );
    const notes = state.notes.map((note) =>
      note.folderId === deletedFolder.id ? { ...note, folderId: '' } : note
    );
    dispatch({
      type: ActionTypes.DELETE_FOLDER,
      payload: {
        folders: folders,
        notes: notes,
        selectedFolderId: selectNewFolderId(
          state.selectedFolderId,
          deletedFolder.id
        ),
      },
    });
  };

  const handleOnDragEnd = (result) => {
    const { source, draggableId, destination } = result;
    if (!destination) return;
    const folderIdMatch = destination.droppableId.match(/folder_(.*)/);
    if (source.droppableId === 'notes-list' && folderIdMatch) {
      changeNoteFolder(draggableId, folderIdMatch[1]);
    }
  };

  const changeNoteFolder = (noteId, folderId) => {
    const note = state.notes.find((note) => note.id === noteId);
    if (note && note.folderId !== folderId) {
      handleNoteUpdated({
        ...note,
        folderId: folderId,
      });
    }
  };

  const handleSelectedFolderChanged = (item) => {
    dispatch({
      type: ActionTypes.SELECTED_FOLDER_CHANGED,
      payload: {
        folders: foldersChanged(item),
        selectedFolderId: item.id,
      },
    });
  };

  const foldersChanged = (updatedFolder) => {
    const folders = state.folders.map((folder) =>
      folder.id === updatedFolder.id ? updatedFolder : folder
    );
    return folders;
  };

  const handleShowAllItems = () => {
    dispatch({ type: ActionTypes.SHOW_ALL_NOTES });
  };

  const handleToggleDarkMode = () => {
    dispatch({ type: ActionTypes.TOGGLE_DARK_MODE });
  };

  const LoadText = () => {
    if (state.isLoading) {
      return 'Loading ...';
    }
    if (state.isSaving) {
      return 'Saving ...';
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {state.isLoading || state.isSaving ? (
        <LoadSpinner text={LoadText()} />
      ) : null}
      <div className={`container ${state.darkModeOn ? 'dark-mode' : ''}`}>
        <div className='side'>
          <SidePane
            items={state.folders}
            selectedItemId={state.selectedFolderId}
            selectedItemUpdated={handleSelectedFolderChanged}
            handleAddItem={addNewFolder}
            handleDeleteItem={handleDeleteFolder}
            showAllItems={handleShowAllItems}
          />
        </div>
        <div className='main'>
          <Header
            checked={state.darkModeOn}
            toggleDarkMode={handleToggleDarkMode}
          />
          <Search handleSearchNote={handleSearchNote} />
          <NoteList
            notes={filteredNotes()}
            handleAddNote={handleAddNote}
            handleDeleteNote={handleDeleteNote}
            handleNoteUpdated={handleNoteUpdated}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
