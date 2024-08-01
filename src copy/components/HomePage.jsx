import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CustomDrawer from './Drawer';
import { SpinningCircles } from 'react-loading-icons';
import { FaBars, FaPlus } from 'react-icons/fa';
import 'typeface-fira-sans';

const HomePage = ({ signOut }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan data user
  const navigate = useNavigate(); // Import useNavigate hook

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
     
  };

  return (
    <div className="flex flex-col min-h-screen font-fira-sans relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded flex justify-center items-center">
            <SpinningCircles />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="text-xl font-bold">Quran Tracker</div>
        <div className="flex items-center">
          <p className="mr-4">Welcome!</p>
          <Button onClick={toggleDrawer} className="bg-white">
            <FaBars />
          </Button>
        </div>
      </header>

      <CustomDrawer open={open} toggleDrawer={toggleDrawer} handleSignOut={handleSignOut} />

      {/* Main Content */}
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-semibold">Home Page</h2>

          {user && (
            <ul>
              <li><strong>Email:</strong> {user.user.email}</li>
              <li><strong>Username:</strong> {user.user.username}</li>
              <ul>
                <li><strong>Checkpoints:</strong> {user.contentData.checkpoints.join(', ')}</li>
              </ul>
            </ul>
          )}

          <div className='bg-gray-800 text-center'>
            <h2 className='text-white'> Add New Checkpoint </h2>
            <button className='bg-white rounded-full'>
              <FaPlus />
            </button>
          </div>

          <h2 className=''> Last Ayah Read </h2>

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Quran Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
