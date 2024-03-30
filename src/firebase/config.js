// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database"; 
import { getStorage } from "firebase/storage"; // Add this import


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6Cd0mbIhIzQCs5ZEYCOtXgm_MY0f0ddw",
  authDomain: "vikiran-28f65.firebaseapp.com",
  projectId: "vikiran-28f65",
  storageBucket: "vikiran-28f65.appspot.com",
  messagingSenderId: "998439364766",
  appId: "1:998439364766:web:44ab5ebb1022cbf3c1338f",
  // databaseURL: "https://vikiran-28f65-default-rtdb.firebaseio.com/",
  appId: "1:998439364766:web:44ab5ebb1022cbf3c1338f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const database = getDatabase(app);
const storage = getStorage(app); // Initialize Firebase Storage


export { app, auth, db, storage };
