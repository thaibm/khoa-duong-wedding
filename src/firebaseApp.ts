// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTLC3MB-MnF9zfrd3SupJ1RYESfQghamg",
  authDomain: "khoa-duong.firebaseapp.com",
  databaseURL: "https://khoa-duong-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "khoa-duong",
  storageBucket: "khoa-duong.appspot.com",
  messagingSenderId: "467242392926",
  appId: "1:467242392926:web:4b7845baddfbd5e921c3cf",
  measurementId: "G-QG0WJ2NHYQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
