// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN4g7rI4mElJQ3b4hMKFJBbVLdLNc-qic",
  authDomain: "react-note-d7d16.firebaseapp.com",
  projectId: "react-note-d7d16",
  storageBucket: "react-note-d7d16.appspot.com",
  messagingSenderId: "5476724513",
  appId: "1:5476724513:web:5da6f8710b0df0bc12d860"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes")
