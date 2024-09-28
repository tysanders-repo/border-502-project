import { API_URL } from '../constants';

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

export {
    createMemberDiet,
};