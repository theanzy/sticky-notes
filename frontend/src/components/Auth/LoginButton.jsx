import React from 'react';
import { MdOutlineLogin } from 'react-icons/md';

const LoginButton = ({ signIn }) => {
  return (
    <button className='outline-white' onClick={signIn}>
      <MdOutlineLogin size={12} style={{ marginRight: '2px' }} /> Log In
    </button>
  );
};

export default LoginButton;
