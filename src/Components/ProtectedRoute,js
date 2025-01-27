import { useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const history=useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return user ? children : history.replace("/");
};

export default ProtectedRoute;
