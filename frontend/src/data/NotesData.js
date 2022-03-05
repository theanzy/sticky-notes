const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const saveNotes = async (notes) => {
  await delay(500);
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const getNotes = async () => {
  await delay(500);
  return JSON.parse(localStorage.getItem('notes'));
};

export const saveFolders = async (folders) => {
  await delay(500);
  localStorage.setItem('folders', JSON.stringify(folders));
};

export const getFolders = async () => {
  await delay(500);
  return JSON.parse(localStorage.getItem('folders'));
};

/// api
export const addFolder = async (folder) => {
  await delay(500);
  console.log('add new folder', folder);
};
export const deleteFolder = async (folder) => {
  await delay(500);
  console.log('delete a folder', folder);
};

export const updateFolder = async (folder) => {
  await delay(500);
  console.log('update a folder', folder);
};

export const updateNote = async (note) => {
  await delay(500);
  console.log('update note api', note);
};

export const deleteNote = async (id) => {
  await delay(500);
  console.log('delete note api', id);
};

export const addNote = async (note) => {
  await delay(500);
  console.log('add noew note api', note);
};
