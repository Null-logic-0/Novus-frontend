import { QueryClient } from "@tanstack/react-query";

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

export async function getMe(token) {
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

  if (!response.ok) {
    const error = new Error(data?.message);
    error.code = response.status;
    error.info = data;
    throw error;
  }
  return data;
}

export async function updateMe({ token, data }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/users/updateMe`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Update failed!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function updatePassword({ token, data }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const passwordCurrent = data.get("passwordCurrent");
  const password = data.get("password");
  const passwordConfirm = data.get("passwordConfirm");

  const response = await fetch(`${URL}/users/updateMyPassword`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      passwordCurrent,
      password,
      passwordConfirm,
    }),
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to update password!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getAllUsers(token) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to fetch users!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getUser({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(
      result?.message || "Failed to find user with this id!"
    );
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function searchUser({ token, type, query = "" }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(
    `${URL}/users/search/connections?query=${query}&type=${type}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to find users!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function followUnfollowUser({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/users/follow/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message);
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getFollowerUsers({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/users/followers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to find followers!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getFollowingUsers({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/users/following/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to find followers!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getActivity(token) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/activity`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to find activity!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getPosts(token, filter) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const query = filter ? `?filter=${filter}` : "";
  const response = await fetch(`${URL}/posts${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to fetch posts!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getSinglePost({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message);
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function createPost({ token, data }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Post creation failed!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function updatePost({ token, data, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const response = await fetch(`${URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Post updated failed!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result.data;
}

export async function deletePost({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    const error = new Error(result?.message || "Failed to delete the post.");
    error.code = response.status;
    error.info = result;
    throw error;
  }

  return { success: true, message: "Post deleted successfully." };
}

export async function createComment({ token, data, postId }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Comment creation failed!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getComments({ token, postId }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Failed to fetch comments!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function getSingleComment({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Fetch Comment Failed!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result;
}

export async function updateComment({ token, id, data }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const response = await fetch(`${URL}/posts/comments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),

    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message || "Comment updated failed!");
    error.code = response.status;
    error.info = result;
    throw error;
  }
  return result.data;
}

export async function deleteComment({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    const error = new Error(result?.message || "Failed to delete the comment.");
    error.code = response.status;
    error.info = result;
    throw error;
  }

  return { success: true, message: "Comment deleted successfully." };
}

export async function postLike({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const response = await fetch(`${URL}/posts/${id}/like`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message);
    error.code = response.status;
    error.info = result;
    throw error;
  }

  return result;
}

export async function commentLike({ token, id }) {
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${URL}/posts/comments/${id}/like`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result?.message);
    error.code = response.status;
    error.info = result;
    throw error;
  }

  return result;
}
