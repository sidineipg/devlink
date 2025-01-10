 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM-zAmHYRVcVA2WtdNQhtKwOaue61qX7I",
  authDomain: "reactlinks-ff49e.firebaseapp.com",
  projectId: "reactlinks-ff49e",
  storageBucket: "reactlinks-ff49e.firebasestorage.app",
  messagingSenderId: "26787858749",
  appId: "1:26787858749:web:03774091906718e137dd54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }