import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD214BUCte9u3LGq3DxNekB9hq1QiqImB0",
  authDomain: "react-native-login-94826.firebaseapp.com",
  projectId: "react-native-login-94826",
  storageBucket: "react-native-login-94826.firebasestorage.app",
  messagingSenderId: "437928362999",
  appId: "1:437928362999:web:e745c055dd800cd43b64f2"
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
