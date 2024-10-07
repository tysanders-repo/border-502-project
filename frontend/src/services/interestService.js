import { API_URL } from '../constants';

async function fetchAllCareerInterests() {
    const response = await fetch(`${API_URL}/interests/type/career`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function fetchAllCompanyInterests() {
    const response = await fetch(`${API_URL}/interests/type/company`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function fetchAllPersonalInterests() {
    const response = await fetch(`${API_URL}/interests/type/personal`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

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