// lib/firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDiAo0t7yskIh7QPOgKM6JigM-VrUZTPM0",
  authDomain: "driver-ride-88679.firebaseapp.com",
  projectId: "driver-ride-88679",
  storageBucket: "driver-ride-88679.appspot.com", // fixed typo here
  messagingSenderId: "973046499328",
  appId: "1:973046499328:web:6e743c4dc7bc1a160ff0e5",
};

export const firebaseApp = initializeApp(firebaseConfig);