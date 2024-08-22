import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf8iVzQi5L1KzmtV5jqQjqZ63WCJ1y8RE",
  authDomain: "countdown-board-project.firebaseapp.com",
  projectId: "countdown-board-project",
  storageBucket: "countdown-board-project.appspot.com",
  messagingSenderId: "778463579647",
  appId: "1:778463579647:web:173619bc104a58a320abca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };