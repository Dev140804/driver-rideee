// lib/firebase.ts

// Firebase core SDK
import { initializeApp, getApps, getApp } from 'firebase/app';

// Your actual Firebase config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { firebaseApp };