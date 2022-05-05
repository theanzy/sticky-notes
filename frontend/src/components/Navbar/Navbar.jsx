import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import './Navbar.css';
import { useAuth } from '../Auth/AuthContext';

function Navbar() {
  const { signIn, signOut, isAuthenticated } = useAuth();

  return (
    <div className='header'>
      <div className='logo'>
        <span>Sticky</span>
        <span>Notes</span>
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

export default Navbar;
