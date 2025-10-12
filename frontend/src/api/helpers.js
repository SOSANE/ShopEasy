import { AUTH_TOKEN } from "./constants";

export function getToken() {
  const token = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  return token;
}
