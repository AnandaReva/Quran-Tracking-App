import axios from 'axios';
import { auth, provider } from '../firebase/firebase-config';
import {
    signInWithPopup,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
} from 'firebase/auth';

export const CHECK_AUTH = 'CHECK_AUTH';
export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const SIGN_OUT = 'SIGN_OUT';

const API_KEY = process.env.REACT_APP_API_KEY;

const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const checkAuth = () => async (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const localData = localStorage.getItem('user');
            if (!localData) {
                const userExists = await findUser(user.uid);
                if (!userExists) {
                    console.error('Pengguna tidak ditemukan di basis data');
                    dispatch(setUser(null));
                    localStorage.removeItem('user');
                }
            } else {
                dispatch(setUser(JSON.parse(localData)));
            }
        } else {
            dispatch(setUser(null));
            localStorage.removeItem('user');
        }
    });
};
export const findUser = (id) => async (dispatch) => {
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
        console.log(localStorage.getItem('user'));
        dispatch(setUser({ user: userData, contentData }));

        return true;
    } catch (error) {
        console.error('User not found', error);
        dispatch(setError('User not found'));
        return false;
    }
};

export const createUser = (id, username, email) => async (dispatch) => {
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
        await dispatch(findUser(id));
    } catch (error) {
        console.error('Error creating user:', error);
        dispatch(setError('Error creating user. Please try again.'));
    }
};

export const signInWithGoogle = () => async (dispatch) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const { uid, displayName, email } = user;

        const userExists = await dispatch(findUser(uid));

        if (!userExists) {
            await dispatch(createUser(uid, displayName, email));
        }
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        dispatch(setError('Sign in with Google failed, please try again'));
    }
};

export const signUpWithEmailAndPassword = (email, password, username) => async (dispatch) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const { uid, email: userEmail } = user;

        await dispatch(createUser(uid, username, userEmail));
    } catch (error) {
        console.error('Error during email password sign-up:', error);
        dispatch(setError('Failed during Registering, please try again'));
    }
};

export const signInWithEmailAndPassword = (email, password) => async (dispatch) => {
    try {
        const result = await signInWithEmailAndPasswordFirebase(auth, email, password);
        const user = result.user;
        const { uid } = user;

        const userExists = await dispatch(findUser(uid));

        if (!userExists) {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error during email sign-in:', error);
        dispatch(setError('Sign in failed, please try again'));
    }
};

export const signOut = () => async (dispatch) => {
    try {
        await firebaseSignOut(auth);
        localStorage.removeItem('user');
        dispatch({ type: SIGN_OUT });
    } catch (error) {
        console.error('Error during sign out:', error);
        dispatch(setError('Sign out failed, please try again'));
    }
};
