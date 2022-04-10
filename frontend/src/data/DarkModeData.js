export const saveDarkMode = (darkMode) => {
  localStorage.setItem('dark-mode', darkMode);
};

export const getDarkMode = () => {
  return JSON.parse(localStorage.getItem('dark-mode'));
};
