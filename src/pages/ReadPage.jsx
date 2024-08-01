// src/pages/ReadPage.jsx
import React, { useState, useEffect } from 'react';
import Drawer from '../components/Drawer';
import Header from '../components/Header'; 
import 'typeface-fira-sans';
import { Button } from '@mui/material';

const ReadPage = ({ signOut }) => {
  const [open, setOpen] = useState(false);
  const [userLoginData, setUserLoginData] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem('dark-mode') === 'true'
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('userLoginData');
    if (storedUser) {
      setUserLoginData(JSON.parse(storedUser));
    }
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`flex flex-col min-h-screen font-fira-sans ${darkMode ? 'bg-darkBackground text-darkText' : 'bg-gray-100 text-gray-800'}`}>
      {/* Header */}
      <Drawer open={open} toggleDrawer={toggleDrawer} darkMode={darkMode} />

      {/* Drawer */}
      <Drawer open={open} toggleDrawer={toggleDrawer} />

      {/* Main Content */}
      <div className="flex flex-1">
        <main className={`flex-1 p-8 shadow-md m-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-semibold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Read Quran</h2>

          <div className={`bg-gray-800 text-center py-4 rounded-lg shadow-md mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-800'}`}>
            <h2 className="text-white mb-2">Surah</h2>
            <h2 className="text-white mb-2">Ayah</h2>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className={`text-center p-4 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'}`}>
        <p>&copy; {new Date().getFullYear()} Quran Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReadPage;
