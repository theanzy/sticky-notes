import React from 'react';

import ThemeToggleButton from './ThemeToggleButton';
const MainHeader = ({ checked, toggleDarkMode, onSelectedItem }) => {
  const toggleTheme = () => {
    toggleDarkMode((darkMode) => !darkMode);
  };

  return (
    <div className='header-main'>
      <h1>Notes</h1>
      <ThemeToggleButton
        checked={checked}
        onToggle={toggleTheme}
        onSelectedItem={onSelectedItem}
      />
    </div>
  );
};
export default MainHeader;
