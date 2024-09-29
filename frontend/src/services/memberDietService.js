import { API_URL } from '../constants';

// Create Association
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

//get diet for a specific member
async function getMemberDiet(uin) {
  try {
    const response = await fetch(`/member_diets/uin/${uin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch member diet');
    }

    const memberDietData = await response.json();
    return memberDietData;
  } catch (error) {
    console.error('Error fetching member diet:', error);
    return null;
  }
}

// Delete Association
async function deleteMemberDiet(id) {
  const response = await fetch(`${API_URL}/member_diets/${id}`, {
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
};