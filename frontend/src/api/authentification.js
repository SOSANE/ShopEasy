import { AUTH_TOKEN } from "./constants";

export async function login(username, password) {
  const response = await fetch("/api/auth/token/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, username: username }),
  });

  if (response.ok) {
    const res = await response.json();
    sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(res));
    return res;
  }

  return null;
}

export async function logout() {
  const token = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  const response = await fetch("/api/auth/token/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token.auth_token}`,
    },
  });

  if (response.ok) {
    sessionStorage.clear();
    return true; // .
  }
  return false;
}

export async function signup(email, username, password) {
  const response = await fetch("/api/auth/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  if (response.ok) {
    return await response.json();
  }

  return null;
}

export async function userInfo() {
  const token = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  const response = await fetch("/api/auth/users/me/", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Token ${token.auth_token}`,
    },
  });
  if (response.ok) {
    const res = await response.json();
    return res;
  }

  return null;
}
