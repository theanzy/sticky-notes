import React from 'react';
import { useAuth } from './Auth/AuthContext';
import LoginButton from './Auth/LoginButton';
import LogoutButton from './Auth/LogoutButton';
import Profile from './Auth/Profile';
import ThemeToggleButton from './ThemeToggleButton';
const Header = ({ checked, toggleDarkMode, onSelectedItem }) => {
  const toggleTheme = () => {
    toggleDarkMode((darkMode) => !darkMode);
  };
  const { signIn, signOut, user, isAuthenticated } = useAuth();

  return (
    <div className='header'>
      <div className='header-auth'>
        {isAuthenticated ? (
          <>
            <LogoutButton signOut={signOut} />
            <Profile user={user} />
          </>
        ) : (
          <LoginButton signIn={signIn} />
        )}
      </div>
      <div className='header-main'>
        <h1>Notes</h1>
        <ThemeToggleButton
          checked={checked}
          onToggle={toggleTheme}
          onSelectedItem={onSelectedItem}
        />
      </div>
    </div>
  );
};
export default Header;
