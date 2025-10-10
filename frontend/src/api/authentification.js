import { AUTH_TOKEN } from "./constants";

export async function login({ username, password }) {
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
  }

  return null;
}

export function verify() {
  const auth_token = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  // .........................
}

export async function logout() {
  const auth_token = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  const response = await fetch("/api/auth/token/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${auth_token}`,
    },
  });
}

export async function signup({ email, username, password }) {
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
