import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import 'typeface-fira-sans';
import { auth, provider } from './firebase/firebase-config';
import {
  signInWithPopup,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import ReadPage from './components/ReadPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const localData = localStorage.getItem('user');
        if (!localData) {
          const userExists = await findUser(user.uid);
          if (!userExists) {
            console.error('Pengguna tidak ditemukan di basis data');
            setUser(null);
            localStorage.removeItem('user');
            setIsAuthenticated(false);
          }
          setIsAuthenticated(true);
        } else {
          setUser(JSON.parse(localData));
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    });
  };

  const findUser = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/user/',
        { id },
        {
          headers: {
            'api-key': API_KEY,
          },
        }
      );
      const [userResponse, contentResponse] = response.data;
      const userData = userResponse.user;
      const contentData = contentResponse.contentData;

      localStorage.setItem('user', JSON.stringify({ user: userData, contentData }));
      setUser({ user: userData, contentData });
      console.log(localStorage.getItem('user'));
      return true;
    } catch (error) {
      console.error('User not found', error);
      return false;
    }
  };

  const createUser = async (id, username, email) => {
    try {
      await axios.post(
        'http://localhost:8000/user/add',
        { id, username, email },
        {
          headers: {
            'api-key': API_KEY,
          },
        }
      );
      await findUser(id);

    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Error creating user. Please try again.');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { uid, displayName, email } = user;

      const userExists = await findUser(uid);

      if (!userExists) {
        await createUser(uid, displayName, email);
      }
      console.log('User data:', user);
      setErrorMessage('');

    } catch (error) {
      console.error('Error during Google sign-in:', error);
      setErrorMessage('Sign in with Google failed, please try again');
    }
  };

  const signUpWithEmailAndPassword = async (email, password, username) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const { uid, email: userEmail } = user;

      await createUser(uid, username, userEmail);


      console.log('User data:', user);
      setErrorMessage('');


    } catch (error) {
      console.error('Error during email sign-up:', error);
      setErrorMessage('Failed during Registering, please try again');
    }
  };

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPasswordFirebase(auth, email, password);
      const user = result.user;
      const { uid } = user;

      const userExists = await findUser(uid);

      if (!userExists) {
        throw new Error('User not found');
      }

      console.log('User data:', user);
      setErrorMessage('');

    } catch (error) {
      console.error('Error during email sign-in:', error);
      setErrorMessage('Sign in failed, please try again');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      console.log('User signed out');
      setErrorMessage('');
    } catch (error) {
      console.error('Error during sign out:', error);
      setErrorMessage('Sign out failed, please try again');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/Quran-tracker"
            element={
              isAuthenticated ? (
                <Navigate to="/Quran-tracker/home" />
              ) : (
                <AuthPage
                  signInWithEmailAndPassword={signInWithEmailAndPassword}
                  signUpWithEmailAndPassword={signUpWithEmailAndPassword}
                  signInWithGoogle={signInWithGoogle}
                  errorMessage={errorMessage}
                />
              )
            }
          />
          <Route
            path="/Quran-tracker/home"
            element={isAuthenticated ? <HomePage signOut={signOut} /> : <Navigate to="/Quran-tracker" />}
          />
          <Route
            path="/Quran-tracker/read"
            element={isAuthenticated ? <ReadPage signOut={signOut} /> : <Navigate to="/Quran-tracker" />}
          />
          <Route path="/" element={<Navigate to="/Quran-tracker" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
