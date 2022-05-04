import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import Header from '../Header/Header';
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
      <Header />
      <header className='showcase'>
        <div className='content'>
          <div className='title'>
            Welcome To <br />
            Sticky<span className='light-purple'>Notes</span>
          </div>
          <div className='text'>Where Do You Want Fresh To Go Today?</div>
        </div>
      </header>
    </>
  );
}

export default LandingPage;
