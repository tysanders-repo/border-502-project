"use server";
const API_URL = "http://localhost:3000";
import { cookies } from "next/headers";

async function fetchAllUsers() {
  const token = cookies().get("next-auth.session-token")?.value
  const response = await fetch(`${API_URL}/members`, {
    method: 'GET',
    headers: {
      'Authentication': `${token}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}

async function fetchUser(id) {
  const token = cookies().get("next-auth.session-token")?.value
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: 'GET',
    headers: {
      'Authentication': `${token}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}

async function createUser(userData) {
  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateUser(id, userData) {
  const token = cookies().get("next-auth.session-token")?.value
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      'Authentication': `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

//UNSAFE MAYBE???
async function updateUserPresident(id, postData) {
  const token = cookies().get("next-auth.session-token")?.value
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      'Authentication': `${token}`,
      "Content-Type": "application/json",
      Role: "president",
    },
    body: JSON.stringify(postData),
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteUser(id) {
  const token = cookies().get("next-auth.session-token")?.value
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
    headers: {
      'Authentication': `${token}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export {
  createUser,
  deleteUser,
  fetchAllUsers,
  fetchUser,
  updateUser,
  updateUserPresident,
};
