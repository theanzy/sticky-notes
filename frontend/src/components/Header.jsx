import React from 'react';
import LoginButton from './Auth/LoginButton';
import LogoutButton from './Auth/LogoutButton';
import Profile from './Auth/Profile';
import ThemeToggleButton from './ThemeToggleButton';
import { useAuth0 } from '@auth0/auth0-react';
import LoadSpinner from './LoadSpinner/LoadSpinner';

const Header = ({ checked, toggleDarkMode, onSelectedItem }) => {
  const toggleTheme = () => {
    toggleDarkMode((darkMode) => !darkMode);
  };
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <LoadSpinner />;
  }
  return (
    <div className='header'>
      <div className='header-auth'>
        {isAuthenticated ? (
          <>
            <LogoutButton />
            <Profile user={user} />
          </>
        ) : (
          <LoginButton />
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
