import { AUTH_TOKEN } from "../../api/constants";
import { SET_TOKEN } from "../actions";

/**
 * Auth reducer pour garder les etats relies a l'utilisateur -> user info, token, is_loggedin (peut-etre?)
 */

export async function getToken() {
  const token = sessionStorage.getItem(AUTH_TOKEN);
  return token;
}

export async function authReducer({ state, action }) {
  if (action.type === SET_TOKEN) {
    sessionStorage.setItem(AUTH_TOKEN, action.token);

    return {
      token: action.token,
    };
  }
}
