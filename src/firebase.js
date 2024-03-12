// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBFc0MqWH-sTgxxdCpveGJxIL5PwMMit5E",
  authDomain: "videoxweb.firebaseapp.com",
  projectId: "videoxweb",
  storageBucket: "videoxweb.appspot.com",
  messagingSenderId: "279680255908",
  appId: "1:279680255908:web:85af2fa461f103211a2331",
  measurementId: "G-GMX5NEVLH3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);