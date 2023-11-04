// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDCciRzy15K607G3amrUttl8lQSRa01YDc",
  authDomain: "taskify-2accd.firebaseapp.com",
  projectId: "taskify-2accd",
  storageBucket: "taskify-2accd.appspot.com",
  messagingSenderId: "1081225233612",
  appId: "1:1081225233612:web:28c6b37696bc6433922e69",
  measurementId: "G-T77M0TNTYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app, auth};