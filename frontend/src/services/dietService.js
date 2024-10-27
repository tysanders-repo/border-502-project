import { API_URL } from "../constants";

/**
 * Fetch all dietary restrictions from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to an array of dietary restrictions.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchAllDietRestrictions() {
  const response = await fetch(`${API_URL}/dietary_restrictions`);
  if (!response.ok) {
    throw new Error(response.statusText);
    // console.log(response);
  }
  return response.json();
}

/**
 * Create a new dietary restriction.
 *
 * @param {Object} dietData - The data for the dietary restriction to create.
 * @returns {Promise<Object>} A promise that resolves to the created dietary restriction object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function createDietaryRestriction(dietData) {
  const response = await fetch(`${API_URL}/dietary_restrictions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dietData),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { fetchAllDietRestrictions, createDietaryRestriction };
