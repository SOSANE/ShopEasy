import { AUTH_TOKEN } from "./constants";
import { getToken } from "./helpers";

export async function login(username, password) {
  try {
    const response = await fetch("/api/auth/token/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, username }),
    });

    if (response.ok) {
      const res = await response.json();
      sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(res));
      return res;
    } else {
      throw new Error();
    }
  } catch (e) {
    return null;
  }
}

export async function logout() {
  try {
    const token = getToken();
    const response = await fetch("/api/auth/token/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token.auth_token}`,
      },
    });

    if (response.ok) {
      sessionStorage.clear();
      return true;
    } else {
      throw Error();
    }
  } catch (e) {
    return false;
  }
}

export async function signup(email, username, password) {
  try {
    const response = await fetch("/api/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const res = await response.json();

    if (response.ok || response.status == 400) {
      return res;
    } else {
      throw new Error();
    }
  } catch (e) {
    return null;
  }
}

export async function userInfo() {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const response = await fetch("/api/auth/users/me/", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Token ${token.auth_token}`,
      },
    });

    if (response.ok) {
      const res = await response.json();
      if (!res.username || !res.email) {
        throw new Error("Champs manquants");
      }
      return res;
    }
  } catch (e) {
    return null;
  }
}
