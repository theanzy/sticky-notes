import React from 'react';
import { MdOutlineLogout } from 'react-icons/md';
const LogoutButton = ({ signOut }) => {
  return (
    <button className='outline-white' onClick={() => signOut()}>
      <MdOutlineLogout size={12} style={{ marginRight: '2px' }} />
      Log Out
    </button>
  );
};

export default LogoutButton;
