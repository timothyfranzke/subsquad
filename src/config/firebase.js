// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
// Get this from Firebase Console -> Project Settings -> General -> Your Apps -> SDK setup and configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWxstnZMhaVsq8DgHrvIgBe40SjaoNCSQ",
    authDomain: "subsquad-756f7.firebaseapp.com",
    projectId: "subsquad-756f7",
    storageBucket: "subsquad-756f7.firebasestorage.app",
    messagingSenderId: "783525854006",
    appId: "1:783525854006:web:c3729465509f013abc5197",
    measurementId: "G-6V37M3QWW6"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };