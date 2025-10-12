import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  return <AuthContext value={{ currentUser, setCurrentUser }}>{children}</AuthContext>;
}
