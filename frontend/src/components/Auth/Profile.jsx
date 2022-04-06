import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <button className='outline-white'>{user.name}</button>
    </div>
  );
};

export default Profile;
