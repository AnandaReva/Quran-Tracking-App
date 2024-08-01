// src/firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbRcaoHpvclWkW7_Q79scqhenjz-v4twM",
    authDomain: "rumpi-5e3a5.firebaseapp.com",
    projectId: "rumpi-5e3a5",
    storageBucket: "rumpi-5e3a5.appspot.com",
    messagingSenderId: "189984178119",
    appId: "1:189984178119:web:c83a2ad4f89c61745fa3e2",
    measurementId: "G-7R7LZWXJFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Tambahkan ini
const provider = new GoogleAuthProvider();

export { auth, analytics, provider };
