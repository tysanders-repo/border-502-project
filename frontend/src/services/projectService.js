import { API_URL } from "../constants";

/**
 * Fetch all projects from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of project objects.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchAllProjects() {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Fetch a single project by ID from the API.
 *
 * @param {string} id - The ID of the project to fetch.
 * @returns {Promise<Object>} A promise that resolves to the project object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Create a new project in the API.
 *
 * @param {Object} projectData - The data of the project to create.
 * @param {string} projectData.title - The title of the project.
 * @param {string} projectData.description - The description of the project.
 * @param {string} projectData.date - The date of the project.
 * @param {Array<File>} projectData.images - An array of image files for the project.
 * @returns {Promise<Object>} A promise that resolves to the created project object.
 * @throws {Error} Throws an error if the response is not ok.
 */
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

/**
 * Update an existing project in the API.
 *
 * @param {string} id - The ID of the project to update.
 * @param {Object} projectData - The updated data for the project.
 * @param {Array<File>} projectData.images - An array of image files for the project.
 * @param {Array<string>} removedImages - An array of image IDs to remove from the project.
 * @returns {Promise<Object>} A promise that resolves to the updated project object.
 * @throws {Error} Throws an error if the response is not ok.
 */
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

/**
 * Delete a project by ID from the API.
 *
 * @param {string} id - The ID of the project to delete.
 * @returns {Promise<Object|null>} A promise that resolves to null if deletion is successful, or the response JSON.
 * @throws {Error} Throws an error if the response is not ok.
 */
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
