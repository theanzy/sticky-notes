import React from 'react';
import { MdOutlineLogin } from 'react-icons/md';

const LoginButton = ({ signIn }) => {
  return (
    <button className='outline-white' onClick={signIn}>
      <MdOutlineLogin size={12} /> Log In
    </button>
  );
};

export default LoginButton;
