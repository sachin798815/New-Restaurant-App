import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        }
      }
    };

    checkAdminRole();
  }, []);

  return isAdmin;
};

export default useAdminCheck;
