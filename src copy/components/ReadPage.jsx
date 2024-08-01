// src/pages/ReadPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { SpinningCircles } from 'react-loading-icons';
import { FaBars, FaPlus } from 'react-icons/fa';
import CustomDrawer from './Drawer';
import 'typeface-fira-sans';

const ReadPage = ({ signOut }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
          {user && (
            <p className="mr-4">
              {user?.user?.username}
            </p>
          )}
          <Button onClick={toggleDrawer} className="bg-white">
            <FaBars />
          </Button>
        </div>
      </header>

      {/* Drawer */}
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} handleSignOut={handleSignOut} />

      {/* Main Content */}
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-semibold">Read Al-Quran Online</h2>

          {user && (
            <ul>
              <li><strong>Email:</strong> {user.user.email}</li>
              <li><strong>Username:</strong> {user.user.username}</li>
              <ul>
                <li><strong>Checkpoints:</strong> {user.contentData.checkpoints.join(', ')}</li>
              </ul>
            </ul>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Quran Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReadPage;
