import React from 'react';
import { Button } from '@mui/material';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode, toggleDrawer }) => {
  return (
    <header className={`p-4 flex items-center justify-between shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'}`}>
      <div className="text-xl font-bold">Quran Tracker</div>
      <div className="flex items-center">
        <Button onClick={toggleDarkMode} className="text-white bg-green-800 hover:bg-green-700">
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>
        <Button onClick={toggleDrawer} className="text-white bg-green-800 hover:bg-green-700 ml-4">
          <FaBars className='text-white' />
        </Button>
      </div>
    </header>
  );
};

export default Header;
