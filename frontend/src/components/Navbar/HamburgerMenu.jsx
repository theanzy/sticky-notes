import React from 'react';
import './HamburgerMenu.css';
function HamburgerMenu(props) {
  const { signIn, signOut, isAuthenticated } = props;

  return (
    <div className='menu-wrap'>
      <input type='checkbox' className='toggler' />
      <div className='hamburger'>
        <div></div>
      </div>
      <div className='menu'>
        <ul>
          {isAuthenticated ? (
            <li onClick={() => signOut()}>
              <a>Logout</a>
            </li>
          ) : (
            <>
              <li onClick={() => signIn()}>
                <a>Login</a>
              </li>{' '}
              <li onClick={() => signIn()}>
                <a>Register</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HamburgerMenu;
