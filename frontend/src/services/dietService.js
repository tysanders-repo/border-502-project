import { API_URL } from '../constants';

async function fetchAllDietRestrictions() {
    const response = await fetch(`${API_URL}/dietary_restrictions`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

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

export {
    fetchAllDietRestrictions,
    createDietaryRestriction,
};