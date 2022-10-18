import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA00u06FVuuukn6DPADh9X3U3w0Tz3jV7I",
  authDomain: "circle-5b7a4.firebaseapp.com",
  projectId: "circle-5b7a4",
  storageBucket: "circle-5b7a4.appspot.com",
  messagingSenderId: "1098595982773",
  appId: "1:1098595982773:web:2666daa597f4914f3e4dfc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const storage = getStorage(app);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };
export { firebase };
