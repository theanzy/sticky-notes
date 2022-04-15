import React, { useCallback, useEffect, useReducer } from 'react';
import NoteList from '../NoteList';
import Search from '../Search';
import Header from '../Header';
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
import { getDarkMode, saveDarkMode } from '../../data/DarkModeData';
import SidePane from '../SidePane/SidePane';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { ActionTypes } from '../../data/Constants';
import { useAuth } from '../Auth/AuthContext';
const initialState = {
  darkModeOn: false,
  isLoading: true,
  isSaving: false,
  folders: [],
  selectedFolderId: '',
  notes: [],
  searchText: '',
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
        isSaving: false,
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
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
        isSaving: false,
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
    case ActionTypes.INIT_DARK_MODE:
      return {
        ...state,
        darkModeOn: action.payload,
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
function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, isAuthLoading } = useAuth();

  const fetchApiAsync = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    const darkMode = getDarkMode();
    dispatch({ type: ActionTypes.INIT_DARK_MODE, payload: darkMode });
    if (isAuthenticated) {
      fetchApiAsync();
    } else {
      dispatch({
        type: ActionTypes.FETCH_ERROR,
      });
    }
    return () => controller?.abort();
  }, [isAuthenticated]);

  const withSaveAsync = async (callback, ...args) => {
    dispatch({ type: ActionTypes.SAVING });
    const res = await callback(...args);
    return res;
  };

  const updateNotesState = (notes) => {
    dispatch({ type: ActionTypes.UPDATE_NOTES, payload: notes });
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
      updateNotesState([...state.notes, newNote]);
    } else {
      dispatch({ type: ActionTypes.FETCH_ERROR });
    }
  };

  const handleDeleteNote = async (id) => {
    const res = await withSaveAsync(deleteNote, id);
    if (res) {
      const updatedNotes = state.notes.filter((note) => note.id !== res.id);
      updateNotesState(updatedNotes);
    } else {
      dispatch({ type: ActionTypes.FETCH_ERROR });
    }
  };
  const handleNoteUpdated = async (updatedNote) => {
    const currentNote = state.notes.find((n) => n.id === updatedNote.id);

    if (currentNote) {
      let data = {};
      if (currentNote.content !== updatedNote.content) {
        data.content = updatedNote.content;
      }
      if (currentNote.color !== updatedNote.color) {
        data.color = updatedNote.color;
      }
      if (!data.content && !data.color) {
        return;
      }
      const noteToUpdate = await withSaveAsync(
        updateNote,
        updatedNote.id,
        data
      );
      const mapper = (note) => {
        return note.id === noteToUpdate.id ? noteToUpdate : note;
      };
      const newNotes = state.notes.map(mapper);
      if (noteToUpdate) {
        updateNotesState(newNotes);
      } else {
        dispatch({ type: ActionTypes.FETCH_ERROR });
      }
    }
  };

  const filteredNotes = () => {
    const notes = state.notes.filter((note) => {
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
    return notes;
  };

  const addNewFolder = async (folderName) => {
    const res = await withSaveAsync(addFolder, {
      name: folderName,
    });
    const folders = [...state.folders, res];

    dispatch({
      type: ActionTypes.ADD_NEW_FOLDER,
      payload: {
        folders: folders,
        selectedFolderId: res.id,
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
    const res = await withSaveAsync(deleteFolder, deletedFolder.id);

    const folders = state.folders.filter((folder_) => folder_.id !== res.id);
    const notes = state.notes.map((note) =>
      note.folderId === res.id ? { ...note, folderId: '' } : note
    );
    dispatch({
      type: ActionTypes.DELETE_FOLDER,
      payload: {
        folders: folders,
        notes: notes,
        selectedFolderId: selectNewFolderId(state.selectedFolderId, res.id),
      },
    });
  };

  const updateField = (item, key, value) => {
    return { ...item, [key]: value };
  };

  const changeNoteFolder = async ({ folderId, noteId }) => {
    const note = state.notes.find((note) => note.id === noteId);
    if (note && note.folderId !== folderId) {
      const data = { folder: folderId };
      const updatedNote = await withSaveAsync(updateNote, noteId, data);
      if (updatedNote) {
        updateNotesState(
          state.notes.map((note) =>
            note.id === updatedNote.id
              ? updateField(note, 'folderId', updatedNote.folderId)
              : note
          )
        );
      } else {
        dispatch({ type: ActionTypes.FETCH_ERROR });
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
    dispatch({
      type: ActionTypes.SELECTED_FOLDER_CHANGED,
      payload: {
        folders: foldersChanged(res),
        selectedFolderId: res.id,
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
    saveDarkMode(!state.darkModeOn);
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
    <>
      {state.isLoading || state.isSaving || isAuthLoading ? (
        <LoadSpinner text={LoadText()} />
      ) : null}
      <div className={`container ${state.darkModeOn ? 'dark-mode' : ''}`}>
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

        <div className='main'>
          <Header
            checked={state.darkModeOn}
            toggleDarkMode={handleToggleDarkMode}
          />
          <div className='content'>
            <Search handleSearchNote={handleSearchNote} />
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
