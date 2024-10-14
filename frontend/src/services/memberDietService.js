import { API_URL } from "../constants";

/**
 * Create a new member diet association.
 *
 * @param {Object} memberDietData - The data for the member diet to create.
 * @returns {Promise<Object>} A promise that resolves to the created member diet object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function createMemberDiet(memberDietData) {
  const response = await fetch(`${API_URL}/member_diets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberDietData),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Get the diet for a specific member by their UIN.
 *
 * @param {string} uin - The UIN of the member.
 * @returns {Promise<Object|null>} A promise that resolves to the member's diet data or null if an error occurs.
 */
async function getMemberDiet(uin) {
  try {
    const response = await fetch(`${API_URL}/member_diets/uin/${uin}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch member diet");
    }

    const memberDietData = await response.json();
    return memberDietData;
  } catch (error) {
    console.error("Error fetching member diet:", error);
    return null;
  }
}

/**
 * Delete all diet associations for a member by their UIN.
 *
 * @param {string} uin - The UIN of the member whose diets to delete.
 * @returns {Promise<void>} A promise that resolves when the diets are successfully deleted.
 * @throws {Error} Throws an error if the request fails.
 */
const deleteMemberDietsByUin = async (uin) => {
  try {
    const response = await fetch(`${API_URL}/member_diets/uin/${uin}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      // Handle success response (e.g., display a success message)
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      // Handle error response (e.g., display an error message)
    }
  } catch (error) {
    console.error("Request failed:", error);
    // Handle network or other errors
  }
};

/**
 * Check if a member has a specific diet item by their UIN and item ID.
 *
 * @param {string} uin - The UIN of the member.
 * @param {string} itemId - The ID of the diet item to check.
 * @returns {Promise<boolean|null>} A promise that resolves to true if the diet item exists, false if not, or null if an error occurs.
 */
const checkMemberDietExists = async (uin, itemId) => {
  try {
    const response = await fetch(
      `${API_URL}/member_diets/exists/${uin}/${itemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Exists:", data.exists);
      return data.exists; // returns true or false
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

/**
 * Delete a specific member diet association by their UIN.
 *
 * @param {string} uin - The UIN of the member diet to delete.
 * @returns {Promise<void|null>} A promise that resolves when the diet is successfully deleted, or null if no content is returned.
 * @throws {Error} Throws an error if the request fails.
 */
async function deleteMemberDiet(uin) {
  const response = await fetch(`${API_URL}/member_diets/${uin}`, {
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
  createMemberDiet,
  deleteMemberDiet,
  getMemberDiet,
  deleteMemberDietsByUin,
  checkMemberDietExists,
};
