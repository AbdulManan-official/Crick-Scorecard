// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSVh3WOknXhCl-rePh1k6fOSc43acs2vo",
  authDomain: "crickscore-e8c4c.firebaseapp.com",
  projectId: "crickscore-e8c4c",
  storageBucket: "crickscore-e8c4c.firebasestorage.app",
  messagingSenderId: "269684038204",
  appId: "1:269684038204:web:de6bff0db72bf1c7f08139",
  measurementId: "G-CKEYGM48M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore, Storage, and Realtime Database
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app);

// Initialize Firebase Analytics

export { auth, db, storage, realtimeDb, };
