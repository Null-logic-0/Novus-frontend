import { QueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const queryClient = new QueryClient();

const URL =
  import.meta.env.VITE_LOCAL_DATA_URL || import.meta.env.VITE_DATA_URL;

async function auth(data, path, message) {
  const response = await fetch(`${URL}/users/${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(message);
    error.code = response.status;
    error.info = result;
    throw error;
  }

  return result;
}

export async function signup(user) {
  return auth(user, "signup", "An error occurred while creating the account");
}

export async function login(user) {
  return auth(user, "login", "An error occurred while logging in");
}

export async function logout() {
  const response = await fetch(`${URL}/users/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return true;
}

export async function getMe() {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    const error = new Error(message);
    error.code = response.status;
    error.info = data;
    throw error;
  }
  return data;
}

// export async function signup(user) {
//   const response = await fetch(`${URL}/users/signup`, {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   const { signupUser } = await response.json();

//   if (!response.ok) {
//     const error = new Error("An error occurred while creating the account");
//     error.code = response.status;
//     error.info = signupUser;
//     throw error;
//   }

//   return signupUser;
// }

// export async function login(user) {
//   const response = await fetch(`${URL}/users/login`, {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   const { loginUser } = await response.json();

//   if (!response.ok) {
//     const error = new Error("An error occurred while logged in!");
//     error.code = response.status;
//     error.info = loginUser;
//     throw error;
//   }

//   return loginUser;
// }
