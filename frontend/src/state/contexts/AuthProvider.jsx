import { useState, useEffect } from "react";

// Fonctions
import { AuthContext } from "./AuthContext";
import { userInfo } from "../../api/authentification";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function setUserInformation() {
      const data = await userInfo();
      if (data) {
        setCurrentUser({
          username: data.username,
          email: data.email,
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    setUserInformation();
  }, []);

  return (
    <AuthContext value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext>
  );
}
