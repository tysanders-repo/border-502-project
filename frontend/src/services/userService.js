"use server";
import { API_URL, TOKEN_NAME } from "../constants";
import { cookies } from "next/headers";

/**
 * Fetch all users from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchAllUsers() {
  const token = cookies().get(TOKEN_NAME)?.value;
  const response = await fetch(`${API_URL}/members`, {
    method: "GET",
    headers: {
      Authentication: `${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Fetch a single user by ID from the API.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchUser(id) {
  const token = cookies().get(TOKEN_NAME)?.value;
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "GET",
    headers: {
      Authentication: `${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Create a new user in the API.
 *
 * @param {Object} userData - The data of the user to create.
 * @returns {Promise<Object>} A promise that resolves to the created user object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function createUser(userData) {
  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Update an existing user in the API.
 *
 * @param {string} id - The ID of the user to update.
 * @param {Object} userData - The updated data for the user.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function updateUser(id, userData) {
  const token = cookies().get(TOKEN_NAME)?.value;
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      Authentication: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Update user dues in the database.
 *
 * @param {string} uin - The UIN of the user to update.
 * @param {boolean} paidDues - The new dues status for the user.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function updateUserDues(uin, paidDues) {
  const token = cookies().get("next-auth.session-token")?.value;

  const response = await fetch(`${API_URL}/members/${uin}`, {
    method: "PUT",
    headers: {
      Authentication: `${token}`,
      "Content-Type": "application/json",
      Role: "treasurer",
    },
    body: JSON.stringify({ paid_dues: paidDues }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

/**
 * Update the president role of a user in the API.
 *
 * @param {string} id - The ID of the user to update.
 * @param {Object} postData - The data to update for the user.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 * @throws {Error} Throws an error if the response is not ok.
 *
 */
async function updateUserPresident(id, postData) {
  const token = cookies().get(TOKEN_NAME)?.value;
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      Authentication: `${token}`,
      "Content-Type": "application/json",
      Role: "president",
    },
    body: JSON.stringify(postData),
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Delete a user by ID from the API.
 *
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<Object|null>} A promise that resolves to null if deletion is successful, or the response JSON.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function deleteUser(id) {
  const token = cookies().get(TOKEN_NAME)?.value;
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
    headers: {
      Authentication: `${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
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
  updateUserDues,
};
