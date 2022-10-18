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
    apiKey: "AIzaSyA2sxQ6LIY3Le97yWd7cRPSU49egj5PLwc",
    authDomain: "circle-app-c63d5.firebaseapp.com",
    projectId: "circle-app-c63d5",
    storageBucket: "circle-app-c63d5.appspot.com",
    messagingSenderId: "427452763319",
    appId: "1:427452763319:web:4c46f31a572469a8ca9132"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const storage = getStorage(app);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };
export { firebase };
