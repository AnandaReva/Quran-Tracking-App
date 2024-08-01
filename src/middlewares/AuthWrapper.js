// middlewares/AuthWrapper.js
import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { RenderRoutes } from "./RenderNavigations";

const API_KEY = process.env.REACT_APP_API_KEY;

export const AuthContext = createContext();



export const AuthWrapper = ({ children }) => {
    const [user, setUser] = useState(() => {
        const localData = localStorage.getItem('userLoginData');
        const isAuthenticated = localData !== null;

        console.log('Initial user state:', localData, isAuthenticated);

        return { 
            userData: localData ? JSON.parse(localData) : null, 
            isAuthenticated 
        };
    });

    const [error, setError] = useState(null);

    // Function to handle user state changes
    const handleAuthStateChange = async (userFirebase) => {
        if (userFirebase) {
            const localData = localStorage.getItem('userLoginData');

            if (localData) {
                setUser({ userData: JSON.parse(localData), isAuthenticated: true });
            } else {
                await findUser(userFirebase.uid);
            }
        } else {
            localStorage.removeItem('userLoginData');
            localStorage.setItem('userAuthStatus', 'false');
            setUser({ userData: null, isAuthenticated: false });
        }
    };

    // Set up authentication state change listener
    onAuthStateChanged(auth, handleAuthStateChange);


    useEffect(() => {
        if (user.userData && !localStorage.getItem('userLoginData')) {
            localStorage.setItem('userLoginData', JSON.stringify(user.userData));
            localStorage.setItem('userAuthStatus', 'true');
        }
    }, [user]);

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
            const [userData, contentData] = response.data;
            const userLoginData = { user: userData.user, contentData: contentData.contentData };
            localStorage.setItem('userLoginData', JSON.stringify(userLoginData));
            setUser({ userData: userLoginData, isAuthenticated: true });
        } catch (error) {
            setUser({ userData: null, isAuthenticated: false });
            setError('Error during getting user info, please try again');
            localStorage.removeItem('userLoginData');
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
            return await findUser(id);
        } catch (error) {
            setError('Error creating user, please try again');
        }
    };

    const signUpWithEmailAndPassword = async (email, password, username) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { uid, email: userEmail } = result.user;
            return await createUser(uid, username, userEmail);
        } catch (error) {
            setError('Sign-up failed, please try again', error);
        }
    };

    const signInWithEmailAndPassword = async (email, password) => {
        try {
            const result = await signInWithEmailAndPasswordFirebase(auth, email, password);
            const { uid } = result.user;
            const userExists = await findUser(uid);
            if (!userExists) {
                throw new Error('User not found');
            }
        } catch (error) {
            setError('Sign in failed, please try again');
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const { uid, displayName, email } = result.user;
            const userExists = await findUser(uid);
            if (!userExists) {
                return await createUser(uid, displayName, email);

            }
        } catch (error) {
            setError('Sign in with Google failed, please try again');
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            localStorage.removeItem('userLoginData');
            localStorage.setItem('userAuthStatus', 'false');
            setUser({ userData: null, isAuthenticated: false });
        } catch (error) {
            setError('Sign out failed, please try again');
        }
    };

    return (
        <AuthContext.Provider value={{ user, signInWithEmailAndPassword, signUpWithEmailAndPassword, signOut, signInWithGoogle, error }}>
            <>
                <RenderRoutes />
                {children}
            </>
        </AuthContext.Provider>
    );
};
