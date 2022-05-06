import React from 'react';

import ThemeToggleButton from './ThemeToggleButton';
const MainHeader = ({ checked, toggleDarkMode, onSelectedItem }) => {
  return (
    <div className='header-main'>
      <ThemeToggleButton
        checked={checked}
        onToggle={() => toggleDarkMode((darkMode) => !darkMode)}
        onSelectedItem={onSelectedItem}
      />
    </div>
  );
};
export default MainHeader;
