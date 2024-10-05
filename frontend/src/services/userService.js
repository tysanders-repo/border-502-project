import { API_URL } from '../constants';

async function fetchAllUsers() {
  const response = await fetch(`${API_URL}/members`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchUser(id) {
  const response = await fetch(`${API_URL}/members/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createUser(userData) {
  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

//UNSAFE MAYBE???
async function updateUserPresident(id, postData) {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Role: "president",
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteUser(id) {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
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
