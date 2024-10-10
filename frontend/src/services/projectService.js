'use server';
const API_URL = "http://localhost:3000";
import { cookies } from 'next/headers';

async function fetchAllProjects() {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createProject(projectData) {
  const token = cookies().get("next-auth.session-token")?.value
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      'Authentication': `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateProject(id, projectData) {
  const token = cookies().get("next-auth.session-token")?.value
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      'Authentication': `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      'Authentication': `${token}`,
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
  createProject,
  deleteProject,
  fetchAllProjects,
  fetchProject,
  updateProject,
};
