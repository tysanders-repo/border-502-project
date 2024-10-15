import { API_URL } from "../constants";

/**
 * Fetch all career interests from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to an array of career interests.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchAllCareerInterests() {
  const response = await fetch(`${API_URL}/interests/type/career`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Fetch all company interests from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to an array of company interests.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchAllCompanyInterests() {
  const response = await fetch(`${API_URL}/interests/type/company`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Fetch all personal interests from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to an array of personal interests.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function fetchAllPersonalInterests() {
  const response = await fetch(`${API_URL}/interests/type/personal`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

/**
 * Create a new interest.
 *
 * @param {Object} interestData - The data for the interest to create.
 * @returns {Promise<Object>} A promise that resolves to the created interest object.
 * @throws {Error} Throws an error if the response is not ok.
 */
async function createInterest(interestData) {
  const response = await fetch(`${API_URL}/interests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(interestData),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export {
  fetchAllCareerInterests,
  fetchAllCompanyInterests,
  fetchAllPersonalInterests,
  createInterest,
};
