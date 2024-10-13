import { API_URL } from "../constants";

/**
 * Create a new member interest association.
 *
 * @param {Object} memberInterestData - The data for the member interest to create.
 * @returns {Promise<Object>} A promise that resolves to the created member interest object.
 * @throws {Error} Throws an error if the response is not ok.
 */
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

/**
 * Get career interests for a member by their UIN.
 *
 * @param {string} uin - The UIN of the member.
 * @returns {Promise<Object|null>} A promise that resolves to the member's career interests or null if an error occurs.
 */
async function getMemberCareerInterests(uin) {
  try {
    const response = await fetch(
      `${API_URL}/member_interests/uin/career/${uin}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch member career interests");
    }

    const memberCareerData = await response.json();
    return memberCareerData;
  } catch (error) {
    console.error("Error fetching member career interests:", error);
    return null;
  }
}

/**
 * Get company interests for a member by their UIN.
 *
 * @param {string} uin - The UIN of the member.
 * @returns {Promise<Object|null>} A promise that resolves to the member's company interests or null if an error occurs.
 */
async function getMemberCompanyInterests(uin) {
  try {
    const response = await fetch(
      `${API_URL}/member_interests/uin/company/${uin}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch member company interests");
    }

    const memberCompanyData = await response.json();
    return memberCompanyData;
  } catch (error) {
    console.error("Error fetching member company interests:", error);
    return null;
  }
}

/**
 * Get personal interests for a member by their UIN.
 *
 * @param {string} uin - The UIN of the member.
 * @returns {Promise<Object|null>} A promise that resolves to the member's personal interests or null if an error occurs.
 */
async function getMemberPersonalInterests(uin) {
  try {
    const response = await fetch(
      `${API_URL}/member_interests/uin/personal/${uin}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch member personal interests");
    }

    const memberPersonalData = await response.json();
    return memberPersonalData;
  } catch (error) {
    console.error("Error fetching member personal interests:", error);
    return null;
  }
}

/**
 * Delete all interests associated with a member by their UIN.
 *
 * @param {string} uin - The UIN of the member whose interests to delete.
 * @returns {Promise<void>} A promise that resolves when the interests are successfully deleted.
 * @throws {Error} Throws an error if the request fails.
 */
const deleteMemberInterestsByUin = async (uin) => {
  try {
    const response = await fetch(`${API_URL}/member_interests/uin/${uin}`, {
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
 * Check if a member has a specific interest by their UIN and interest ID.
 *
 * @param {string} uin - The UIN of the member.
 * @param {string} interest_id - The ID of the interest to check.
 * @returns {Promise<boolean|null>} A promise that resolves to true if the interest exists, false if not, or null if an error occurs.
 */
const checkMemberInterestExists = async (uin, interest_id) => {
  try {
    const response = await fetch(
      `${API_URL}/member_interests/exists/${uin}/${interest_id}`,
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
