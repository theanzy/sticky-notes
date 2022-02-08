export const saveNotes = async (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const getNotes = async () => {
  return JSON.parse(localStorage.getItem('notes'));
};
