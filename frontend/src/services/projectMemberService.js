import { API_URL } from "../constants";

/**
 * Create a new project member association.
 *
 * @param {Object} projectMemberData - The data for the project member to create.
 * @returns {Promise<Object>} A promise that resolves to the created project member object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function createProjectMember(projectMemberData) {
  const response = await fetch(`${API_URL}/project_members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectMemberData),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Get the members for a specific project by the project id.
 *
 * @param {string} project_id - the ID of the project
 * @returns {Promise<Object|null>} A promise that resolves to the project's members or null if an error occurs.
 */
async function getProjectMembers(project_id) {
  try {
    const response = await fetch(
      `${API_URL}/project_members/project/${project_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch project members");
    }

    const projectMembersData = await response.json();
    return projectMembersData;
  } catch (error) {
    console.error("Error fetching project members:", error);
    return null;
  }
}

async function getProjectMembersByProject(project_id) {
  try {
    const response = await fetch(
      `${API_URL}/project_members/project/project_members/${project_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch project members");
    }

    const projectMembersData = await response.json();
    return projectMembersData;
  } catch (error) {
    console.error("Error fetching project members:", error);
    return null;
  }
}

/**
 * Get the projects for a specific member by uin.
 *
 * @param {string} uin - the UIN of the member
 * @returns {Promise<Object|null>} A promise that resolves to the member's projects or null if an error occurs.
 */
async function getMemberProjects(uin) {
  try {
    const response = await fetch(`${API_URL}/project_members/member/${uin}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch member projects");
    }

    const memberProjectsData = await response.json();
    return memberProjectsData;
  } catch (error) {
    console.error("Error fetching member projects:", error);
    return null;
  }
}

/**
 * Delete a specific project member association by the project member id
 *
 * @param {string} projectMemberId - the id of the specific project member association
 * @returns {Promise<void|null>} A promise that resolves when the project member is deleted, or null if no content is returned.
 * @throws {Error} Throws an error if the request fails.
 */
const deleteProjectMember = async (projectMemberId) => {
  try {
    const response = await fetch(
      `${API_URL}/project_members/${projectMemberId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      console.log("Project member deleted successfully.");
    } else {
      const errorData = await response.json();
      console.error("Error deleting project member:", errorData);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export {
  createProjectMember,
  getMemberProjects,
  getProjectMembers,
  getProjectMembersByProject,
  deleteProjectMember,
};
