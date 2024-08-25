// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCaTC7Lnq1LPlVHEmFRQ4_43V9cDyDMm4A",
  authDomain: "fir-todo-46fab.firebaseapp.com",
  projectId: "fir-todo-46fab",
  storageBucket: "fir-todo-46fab.appspot.com",
  messagingSenderId: "627563302166",
  appId: "1:627563302166:web:8bb94c402d11dbad261437"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export const auth  = getAuth(app);

