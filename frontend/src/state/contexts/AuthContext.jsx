import { createContext, useContext } from "react";

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}
