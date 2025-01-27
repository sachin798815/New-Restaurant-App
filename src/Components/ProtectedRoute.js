import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state to prevent flashing

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the auth state is resolved
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading UI
  }

  return user ? children : <Redirect to="/" />;
};

export default ProtectedRoute;
