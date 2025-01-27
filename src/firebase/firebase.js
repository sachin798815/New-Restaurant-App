import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0pqJSQ-yEZoPYGgevk5n-EitxkfOOIdg",
  authDomain: "new-restaurant-app-8f44a.firebaseapp.com",
  projectId: "new-restaurant-app-8f44a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
