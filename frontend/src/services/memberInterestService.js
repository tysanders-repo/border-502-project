import { API_URL } from '../constants';

// Create Association
async function createMemberInterest(memberInterestData) {
    const response = await fetch(`${API_URL}/member_interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberInterestData),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
}

async function getMemberCareerInterests(uin) {
  try {
    const response = await fetch(`${API_URL}/member_interests/uin/career/${uin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch member career interests');
    }

    const memberDietData = await response.json();
    return memberDietData;
  } catch (error) {
    console.error('Error fetching member career interests:', error);
    return null;
  }
}

async function getMemberCompanyInterests(uin) {
    try {
      const response = await fetch(`${API_URL}/member_interests/uin/company/${uin}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch member company interests');
      }
  
      const memberDietData = await response.json();
      return memberDietData;
    } catch (error) {
      console.error('Error fetching member company interests:', error);
      return null;
    }
}

async function getMemberPersonalInterests(uin) {
    try {
      const response = await fetch(`${API_URL}/member_interests/uin/personal/${uin}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch member Personal interests');
      }
  
      const memberDietData = await response.json();
      return memberDietData;
    } catch (error) {
      console.error('Error fetching member Personal interests:', error);
      return null;
    }
}

// delete all associations with member
const deleteMemberInterestsByUin = async (uin) => {
  try {
    const response = await fetch(`${API_URL}/member_interests/uin/${uin}`, {
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

const checkMemberInterestExists = async (uin, interest_id) => {
  try {
    const response = await fetch(`${API_URL}/member_interests/exists/${uin}/${interest_id}`, {
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
// async function deleteMemberDiet(uin) {
//   const response = await fetch(`${API_URL}/member_diets/${uin}`, {
//     method: "DELETE",
//   });

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   if (response.status === 204) {
//     return null;
//   }
//   return response.json();
// }

export {
    createMemberInterest,
    getMemberCareerInterests,
    getMemberPersonalInterests,
    getMemberCompanyInterests,
    deleteMemberInterestsByUin,
    checkMemberInterestExists,
};