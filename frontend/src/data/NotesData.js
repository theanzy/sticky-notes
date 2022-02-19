export const saveNotes = async (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const getNotes = async () => {
  return JSON.parse(localStorage.getItem('notes'));
};

export const saveFolders = async (folders) => {
  localStorage.setItem('folders', JSON.stringify(folders));
};

export const getFolders = async () => {
  return JSON.parse(localStorage.getItem('folders'));
};
