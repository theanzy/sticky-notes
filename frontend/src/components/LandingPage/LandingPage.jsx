import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import Navbar from '../Navbar/Navbar';
import './LandingPage.css';
function LandingPage() {
  const { isAuthenticated, isAuthLoading } = useAuth();
  if (isAuthLoading) {
    return <LoadSpinner text='Loading...' />;
  }
  if (isAuthenticated) {
    return <Navigate to='/home' />;
  }
  return (
    <>
      <Navbar />
      <header className='showcase'>
        <div className='content'>
          <div className='title'>
            Welcome to <br />
            Sticky<span className='light-purple'>Notes</span>
          </div>
          <div className='text'>Notes taking app.</div>
        </div>
      </header>
    </>
  );
}

export default LandingPage;
