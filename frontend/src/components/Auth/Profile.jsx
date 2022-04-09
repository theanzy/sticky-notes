import React from 'react';

const Profile = ({ user }) => {
  return user ? (
    <>
      <button className='outline-white'>{user.name}</button>
      <button className='outline-white'>{user.sub}</button>
    </>
  ) : (
    <h1>no user</h1>
  );
};

export default Profile;
