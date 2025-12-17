import { useState, useEffect } from "react";

// Fonctions
import { AuthContext } from "./AuthContext";
import { userInfo } from "../../api/authentification";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function setUserInformation() {
      const data = await userInfo();
      if (data) {
        setCurrentUser({
          username: data.username,
          email: data.email,
        });
      } else {
        setCurrentUser(null);
      }
    }

    setUserInformation();
  }, []);

  function isLoggedIn() {
    return currentUser != null;
  }

  return <AuthContext value={{ currentUser, setCurrentUser, isLoggedIn }}>{children}</AuthContext>;
}
