import { API_URL } from "../constants";

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
  const formData = new FormData();
  formData.append("project[title]", projectData.title);
  formData.append("project[description]", projectData.description);
  formData.append("project[date]", projectData.date);

  projectData.images.forEach((image) => {
    formData.append("project[images][]", image);
  });

  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

async function updateProject(id, projectData, removedImages = []) {
  const formData = new FormData();
  formData.append("project[title]", projectData.title);
  formData.append("project[description]", projectData.description);
  formData.append("project[date]", projectData.date);

  if (Array.isArray(projectData.images) && projectData.images.length > 0) {
    projectData.images.forEach((image) => {
      formData.append("project[images][]", image);
    });
  }

  if (Array.isArray(removedImages) && removedImages.length > 0) {
    removedImages.forEach((image) => {
      formData.append("project[remove_images][]", image);
    });
  }
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
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
  createProject,
  deleteProject,
  fetchAllProjects,
  fetchProject,
  updateProject,
};
