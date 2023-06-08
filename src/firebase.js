
  import { initializeApp } from "firebase/app";
  import {getFirestore}  from 'firebase/firestore'
  import {getStorage} from 'firebase/storage'

  const firebaseConfig = {
    apiKey: "AIzaSyB4qZenk2sfW1j51A_zytu0Ovh0Sd59SLk",
    authDomain: "tutorial-1a1cd.firebaseapp.com",
    projectId: "tutorial-1a1cd",
    storageBucket: "tutorial-1a1cd.appspot.com",
    messagingSenderId: "419608370008",
    appId: "1:419608370008:web:3406a12e6fbb221e83232d"
  };


  const app = initializeApp(firebaseConfig);
  export const db = getFirestore (app);
  export const storage = getStorage (app);