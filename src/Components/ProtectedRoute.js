import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return user ? children : <Redirect to="/" />;
};

export default ProtectedRoute;
