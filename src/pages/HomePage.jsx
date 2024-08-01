import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Drawer from '../components/Drawer';
import Header from '../components/Header'; 
import { FaBars, FaPlus, FaMoon, FaSun } from 'react-icons/fa';
import 'typeface-fira-sans';

const HomePage = () => {
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
   
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleDrawer={toggleDrawer} />


      <Drawer open={open} toggleDrawer={toggleDrawer} darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex flex-1">
        <main className={`flex-1 p-8 shadow-md m-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-semibold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Home Page</h2>

          {userLoginData ? (
            <ul className="mb-8">
              <li className="mb-2"><strong>Email:</strong> {userLoginData.user.email}</li>
              <li className="mb-2"><strong>Username:</strong> {userLoginData.user.username}</li>
              <li className="mb-2"><strong>Checkpoints:</strong> {userLoginData.contentData.checkpoints.join(', ')}</li>
            </ul>
          ) : (
            <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No user data available</p>
          )}

          <div className={`bg-gray-800 text-center py-4 rounded-lg shadow-md mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-800'}`}>
            <h2 className="text-white mb-2">Add New Checkpoint</h2>
            <button className={`bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              <FaPlus />
            </button>
          </div>

          <h2 className={`text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Last Ayah Read</h2>
        </main>
      </div>

      {/* Footer */}
      <footer className={`text-center p-4 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'}`}>
        <p>&copy; {new Date().getFullYear()} Quran Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
