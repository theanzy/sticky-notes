import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import './Header.css';
import { useAuth } from '../Auth/AuthContext';

function Header() {
  const { signIn, signOut, isAuthenticated } = useAuth();

  return (
    <div className='header'>
      <div className='logo'>
        Sticky<span className='light-purple'>Notes</span>
      </div>
      <div className='btn-group'>
        {isAuthenticated ? (
          <div className='btn btn-outline ' onClick={() => signOut()}>
            Logout
          </div>
        ) : (
          <>
            <div className='btn btn-outline' onClick={() => signIn()}>
              Login
            </div>
            <div className='btn btn-outline' onClick={() => signIn()}>
              Register
            </div>
          </>
        )}
      </div>

      <HamburgerMenu
        signIn={signIn}
        signOut={signOut}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

export default Header;
