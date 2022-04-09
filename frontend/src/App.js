import React from 'react';
import AuthContextProvider from './components/Auth/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NotFoundPage from './components/NotFoundPage';
import HomePage from './components/Home/HomePage';
import { SignInPage } from './components/Auth/SignInPage';
import { SignOutPage } from './components/Auth/SignOutPage';

function App() {
  return (
    <AuthContextProvider>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path='/signin-callback' element={<SignInPage />} />
            <Route path='/signout-callback' element={<SignOutPage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </AuthContextProvider>
  );
}

export default App;
