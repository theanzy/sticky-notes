import React, { useReducer, useState, useEffect } from 'react';
import NoteList from '../NoteList';
import Search from '../Search';
import MainHeader from '../MainHeader';
import {
  getNotes,
  getFolders,
  addFolder,
  deleteFolder,
  updateNote,
  deleteNote,
  addNote,
  updateFolder,
} from '../../data/NotesData';
import SidePane from '../SidePane/SidePane';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { ActionTypes } from '../../data/Constants';
import { useAuth } from '../Auth/AuthContext';
import useLocalStorage from '../Hooks/useLocalStorage';
import Navbar from '../Navbar/Navbar';
import { Navigate } from 'react-router-dom';
const initialState = {
  isLoading: false,
  folders: [],
  selectedFolderId: '',
  notes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        folders: action.payload.folders,
        notes: action.payload.notes,
        isLoading: false,
      };
    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SAVING:
      return {
        ...state,
      };
    case ActionTypes.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload.note],
      };
    case ActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
    case ActionTypes.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.note.id) {
            return action.payload.note;
          }
          return note;
        }),
      };
    case ActionTypes.CHANGE_NOTE_FOLDER:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? updateField(note, 'folderId', action.payload.folderId)
            : note
        ),
      };
    case ActionTypes.ADD_NEW_FOLDER:
      return {
        ...state,
        folders: [...state.folders, action.payload.folder],
        selectedFolderId: action.payload.folder.id,
      };
    case ActionTypes.DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder.id !== action.payload.folderId
        ),
        selectedFolderId: '',
      };
    case ActionTypes.SELECTED_FOLDER_CHANGED:
      return {
        ...state,
        folders: foldersChanged(state.folders, action.payload.folder),
      };
    case ActionTypes.ON_FOLDER_SELECTED:
      return {
        ...state,
        selectedFolderId: action.payload.selectedFolderId,
      };
    case ActionTypes.SHOW_ALL_NOTES:
      return {
        ...state,
        selectedFolderId: '',
      };
    default:
      return state;
  }
};

const updateField = (item, key, value) => {
  return { ...item, [key]: value };
};

const foldersChanged = (folders, updatedFolder) => {
  return folders.map((folder) =>
    folder.id === updatedFolder.id ? updatedFolder : folder
  );
};

function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, isAuthLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchApiAsync = async () => {
      dispatch({ type: ActionTypes.LOADING });
      const [getFoldersResult, getNotesResult] = await Promise.all([
        getFolders(),
        getNotes(),
      ]);
      dispatch({
        type: ActionTypes.FETCH_SUCCESS,
        payload: {
          folders: getFoldersResult,
          notes: getNotesResult,
          isLoading: false,
        },
      });
    };
    let controller = new AbortController();
    if (isAuthenticated) {
      fetchApiAsync();
    } else {
      dispatch({
        type: ActionTypes.FETCH_ERROR,
      });
    }
    return () => controller?.abort();
  }, []);

  const withSaveAsync = async (callback, ...args) => {
    setIsSaving(true);
    const res = await callback(...args);
    return res;
  };

  const dispatchWithSave = (data) => {
    dispatch(data);
    setIsSaving(false);
  };

  const handleAddNote = async (content) => {
    const data = {
      content: content,
      color: 'yellow',
    };
    if (state.selectedFolderId.length > 0) {
      data.folder = state.selectedFolderId;
    }
    const newNote = await withSaveAsync(addNote, data);
    if (newNote) {
      dispatchWithSave({
        type: ActionTypes.ADD_NOTE,
        payload: {
          note: newNote,
        },
      });
    } else {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (id) => {
    const res = await withSaveAsync(deleteNote, id);
    if (res) {
      dispatchWithSave({
        type: ActionTypes.DELETE_NOTE,
        payload: { id: res.id },
      });
    } else {
      setIsSaving(false);
    }
  };
  const handleNoteUpdated = async (updatedNote) => {
    let data = {
      color: updatedNote.color,
      content: updatedNote.content,
    };
    const noteToUpdate = await withSaveAsync(updateNote, updatedNote.id, data);
    if (noteToUpdate) {
      dispatchWithSave({
        type: ActionTypes.UPDATE_NOTE,
        payload: {
          note: noteToUpdate,
        },
      });
    } else {
      setIsSaving(false);
    }
  };

  const filteredNotes = () => {
    const notes = state.notes.filter((note) => {
      const div = document.createElement('div');
      div.innerHTML = note.content;
      const text = div.textContent || div.innerText || '';
      return (
        text.toLocaleLowerCase().includes(searchText) &&
        (state.selectedFolderId.length > 0
          ? note.folderId === state.selectedFolderId
          : true)
      );
    });
    return notes;
  };

  const addNewFolder = async (folderName) => {
    if (folderName == '') {
      return;
    }
    const res = await withSaveAsync(addFolder, {
      name: folderName,
    });
    if (res) {
      dispatchWithSave({
        type: ActionTypes.ADD_NEW_FOLDER,
        payload: {
          folder: res,
        },
      });
    } else {
      setIsSaving(false);
    }
  };

  const handleDeleteFolder = async (deletedFolder) => {
    const res = await withSaveAsync(deleteFolder, deletedFolder.id);
    if (res) {
      dispatchWithSave({
        type: ActionTypes.DELETE_FOLDER,
        payload: {
          folderId: res.id,
        },
      });
    } else {
      setIsSaving(false);
    }
  };

  const changeNoteFolder = async ({ folderId, noteId }) => {
    const note = state.notes.find((note) => note.id === noteId);
    if (note && note.folderId !== folderId) {
      const data = { folder: folderId };
      const updatedNote = await withSaveAsync(updateNote, noteId, data);
      if (updatedNote) {
        dispatchWithSave({
          type: ActionTypes.CHANGE_NOTE_FOLDER,
          payload: { noteId: noteId, folderId: folderId },
        });
      } else {
        setIsSaving(false);
      }
    }
  };

  const handleFolderSelected = (folderId) => {
    dispatch({
      type: ActionTypes.ON_FOLDER_SELECTED,
      payload: {
        selectedFolderId: folderId,
      },
    });
  };

  const handleSelectedFolderChanged = async (item) => {
    const res = await withSaveAsync(updateFolder, item.id, { name: item.name });
    if (res) {
      dispatchWithSave({
        type: ActionTypes.SELECTED_FOLDER_CHANGED,
        payload: {
          folder: res,
        },
      });
    } else {
      setIsSaving(false);
    }
  };

  const handleShowAllItems = () => {
    dispatch({ type: ActionTypes.SHOW_ALL_NOTES });
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const LoadText = () => {
    if (state.isLoading || isAuthLoading) {
      return 'Loading ...';
    }
    if (isSaving) {
      return 'Saving ...';
    }
  };

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <>
      {state.isLoading || isSaving || isAuthLoading ? (
        <LoadSpinner text={LoadText()} />
      ) : null}
      <Navbar />
      <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
        <div className='side'>
          <SidePane
            items={state.folders}
            selectedItemId={state.selectedFolderId}
            selectedItemUpdated={handleSelectedFolderChanged}
            onItemSelected={handleFolderSelected}
            handleAddItem={addNewFolder}
            handleDeleteItem={handleDeleteFolder}
            showAllItems={handleShowAllItems}
            onDropItem={changeNoteFolder}
          />
        </div>

        <div className='home-main'>
          <MainHeader
            checked={darkMode}
            toggleDarkMode={handleToggleDarkMode}
          />
          <div className='content'>
            <Search onChange={(text) => setSearchText(text)} />
            <NoteList
              notes={filteredNotes()}
              handleAddNote={handleAddNote}
              handleDeleteNote={handleDeleteNote}
              handleNoteUpdated={handleNoteUpdated}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
