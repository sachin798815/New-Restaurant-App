import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0pqJSQ-yEZoPYGgevk5n-EitxkfOOIdg",
  authDomain: "new-restaurant-app-8f44a.firebaseapp.com",
  databaseURL: "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com",
  projectId: "new-restaurant-app-8f44a",
  storageBucket: "new-restaurant-app-8f44a.firebasestorage.app",
  messagingSenderId: "103541215740",
  appId: "1:103541215740:web:d39d05ea59fcf88e712279"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
