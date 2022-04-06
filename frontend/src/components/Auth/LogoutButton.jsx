import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { MdOutlineLogout } from 'react-icons/md';
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className='outline-white'
      onClick={() => logout({ returnTo: window.location.origin })}>
      <MdOutlineLogout size={12} style={{ marginRight: '2px' }} />
      Log Out
    </button>
  );
};

export default LogoutButton;
