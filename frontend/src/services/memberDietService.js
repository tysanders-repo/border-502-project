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
    const response = await fetch(`${API_URL}/member_diets/uin/${uin}`, {
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

// delete all associations with member
const deleteMemberDietsByUin = async (uin) => {
  try {
    const response = await fetch(`${API_URL}/member_diets/uin/${uin}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data);
      // Handle success response (e.g., display a success message)
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
      // Handle error response (e.g., display an error message)
    }
  } catch (error) {
    console.error('Request failed:', error);
    // Handle network or other errors
  }
};

const checkMemberDietExists = async (uin, itemId) => {
  try {
    const response = await fetch(`${API_URL}/member_diets/exists/${uin}/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Exists:', data.exists);
      return data.exists; // returns true or false
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};


// Delete Association
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