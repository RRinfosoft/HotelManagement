import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbQ1V9USSp66ozVGEPzqXuEH2QD9-naQ0",
  authDomain: "admin-ef079.firebaseapp.com",
  projectId: "admin-ef079",
  storageBucket: "admin-ef079.appspot.com",
  messagingSenderId: "723414265849",
  appId: "1:723414265849:web:e409368f2ba39417605728"
};
// Initialize Firebase and Firebase Authentication
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app);
export {auth}
const storage = getStorage(app);
export {storage};
export default firebase;