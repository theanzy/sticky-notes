import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { MdOutlineLogin } from 'react-icons/md';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className='outline-white' onClick={() => loginWithRedirect()}>
      <MdOutlineLogin size={12} style={{ marginRight: '2px' }} /> Log In
    </button>
  );
};

export default LoginButton;
