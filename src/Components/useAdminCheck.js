import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdmin = async (user) => {
      setLoading(true);
      setError(null);
      try {
        if (!user) {
          // console.log("No user is logged in.");
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const adminDoc = await getDoc(doc(db, "users", user.uid));
        if (adminDoc.exists() && adminDoc.data().role === "admin") {
          console.log("User is an admin:", adminDoc.data());
          setIsAdmin(true);
        } else {
          // console.log("User is not an admin or document does not exist");
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error checking admin status:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkAdmin(user);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  return { isAdmin, loading, error };
};

export default useAdminCheck;
