import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import ReadPage from './components/ReadPage';
import { checkAuth, signInWithEmailAndPassword, signUpWithEmailAndPassword, signInWithGoogle, signOut } from './middlewares/authActions';
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, errorMessage } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={isAuthenticated ? <HomePage signOut={() => dispatch(signOut())} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<AuthPage 
                                        signInWithEmailAndPassword={(email, password) => dispatch(signInWithEmailAndPassword(email, password))} 
                                        signUpWithEmailAndPassword={(email, password, username) => dispatch(signUpWithEmailAndPassword(email, password, username))}
                                        signInWithGoogle={() => dispatch(signInWithGoogle())}
                                        errorMessage={errorMessage} 
                                      />} 
        />
        <Route path="/read" element={isAuthenticated ? <ReadPage signOut={() => dispatch(signOut())} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}


export default App;
