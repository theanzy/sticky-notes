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
