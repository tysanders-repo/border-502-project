"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@components/organisms/UserForm";
import { Box, Typography } from "@mui/material";
import { fetchUser, updateUser } from "@services/userService";
import { validateUserForm } from "@components/organisms/UserForm/validateUserForm";
import {
  fetchAllDietRestrictions,
  createDietaryRestriction,
} from "@services/dietService";
import {
  createMemberDiet,
  getMemberDiet,
  deleteMemberDietsByUin,
  checkMemberDietExists,
} from "@services/memberDietService";
import {
  fetchAllCareerInterests,
  fetchAllCompanyInterests,
  fetchAllPersonalInterests,
  createInterest,
} from "@services/interestService";
import {
  createMemberInterest,
  checkMemberInterestExists,
  getMemberPersonalInterests,
  getMemberCareerInterests,
  getMemberCompanyInterests,
  deleteMemberInterestsByUin,
} from "@services/memberInterestService";
import ProgressLoading from "@components/organisms/ProgressLoading";
import { getUserRole, getUserUIN } from "@services/authService";

/**
 * UserEditTemplate component
 *
 * This component allows users to edit and update their information.
 * It fetches existing user data based on the provided user ID, handles
 * dietary restrictions and interests, and submits the updated information.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.params - Parameters containing user ID.
 *
 * @returns {JSX.Element} The rendered component.
 */
function UserEditTemplate({
  params,
  isProfile = false,
  isEdit = false,
  setIsEdit = null,
}) {
  // State to hold user data
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    uin: null,
    major: "",
    year: null,
    email: "",
    phone: "",
    tshirt_size: "",
    aggie_ring_day: null,
    birthday: null,
    graduation_day: null,
    accomplishments: null,
    interests: null,
    dietary_restrictions: null,
  });

  // State to manage loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({ name: false, uin: false });

  // State for dietary restrictions and interests
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] =
    useState([]);
  const [personalInterests, setPersonalInterests] = useState([]);
  const [selectedPersonalInterests, setSelectedPersonalInterests] = useState(
    [],
  );
  const [companyInterests, setCompanyInterests] = useState([]);
  const [selectedCompanyInterests, setSelectedCompanyInterests] = useState([]);
  const [careerInterests, setCareerInterests] = useState([]);
  const [selectedCareerInterests, setSelectedCareerInterests] = useState([]);

  // Router for navigation
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchDietaryRestrictions = async () => {
      try {
        const restrictions = await fetchAllDietRestrictions();
        setDietaryRestrictions(restrictions);
      } catch (error) {
        console.error("Error fetching dietary restrictions:", error);
      }
    };

    const fetchPersonalInterests = async () => {
      try {
        const interests = await fetchAllPersonalInterests();
        setPersonalInterests(interests);
      } catch (error) {
        console.error("Error fetching personal interests:", error);
      }
    };

    const fetchCareerInterests = async () => {
      try {
        const interests = await fetchAllCareerInterests();
        setCareerInterests(interests);
      } catch (error) {
        console.error("Error fetching career interests:", error);
      }
    };

    const fetchCompanyInterests = async () => {
      try {
        const interests = await fetchAllCompanyInterests();
        setCompanyInterests(interests);
      } catch (error) {
        console.error("Error fetching company interests:", error);
      }
    };

    const fetchCurrentUser = async () => {
      setLoading(true);
      const uin = await getUserUIN();
      const role = await getUserRole();
      if (uin !== id && role !== "president") {
        router.push("/");
      } else {
        try {
          // Fetch user data based on ID
          const userData = await fetchUser(id);
          setUser(userData);
          setSelectedDietaryRestrictions(userData.dietary_restrictions);
          setSelectedPersonalInterests(userData.interests.personal);
          setSelectedCareerInterests(userData.interests.career);
          setSelectedCompanyInterests(userData.interests.company);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchDietaryRestrictions(),
        fetchPersonalInterests(),
        fetchCareerInterests(),
        fetchCompanyInterests(),
        fetchCurrentUser(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Handler for dietary restriction change
  const handleDietaryRestrictionChange = (event, newValue) => {
    setSelectedDietaryRestrictions(newValue);
  };

  // Handlers for interest changes
  const handlePersonalInterestRestrictionChange = async (event, newValue) => {
    setSelectedPersonalInterests(newValue);
  };

  const handleCareerInterestRestrictionChange = async (event, newValue) => {
    setSelectedCareerInterests(newValue);
  };

  const handleCompanyInterestRestrictionChange = async (event, newValue) => {
    setSelectedCompanyInterests(newValue);
  };

  // Cancel button handler to navigate back to the Member page
  const handleCancel = () => {
    if (isProfile) {
      router.push(`/Profile`);
      setIsEdit(false);
    } else {
      router.push(`/Member`);
    }
  };

  /**
   * Handles form submission for updating user data.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUserForm(user, setFormError)) {
      // Create updated user object
      const updatedUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        uin: user.uin,
        major: user.major,
        year: user.year,
        email: user.email,
        phone: user.phone,
        tshirt_size: user.tshirt_size,
        aggie_ring_day: user.aggie_ring_day,
        birthday: user.birthday,
        graduation_day: user.graduation_day,
      };
      try {
        // Update user data
        const response = await updateUser(id, updatedUser);

        try {
          // Add new dietary restrictions
          for (const restriction of selectedDietaryRestrictions) {
            let restrictionObject;
            if (typeof restriction === "string") {
              const existingRestriction = dietaryRestrictions.find(
                (restrictions) =>
                  restrictions.item_name.toLowerCase() ===
                  restriction.toLowerCase(),
              );
              if (!existingRestriction) {
                restrictionObject = await createDietaryRestriction({
                  item_name: restriction,
                });
              } else {
                restrictionObject = existingRestriction;
              }
            } else {
              restrictionObject = restriction;
            }

            // Only create member diet if it doesn't already exist
            const exist_response = await checkMemberDietExists(
              response.uin,
              restrictionObject.id,
            );
            if (!exist_response) {
              await createMemberDiet({
                uin: response.uin,
                item_id: restrictionObject.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add diets"); // Set error if dietary restriction addition fails
        }

        try {
          // Add new personal interests
          for (const personalInterest of selectedPersonalInterests) {
            let persInterestObj;
            if (typeof personalInterest === "string") {
              const existingPersonalInterest = personalInterests.find(
                (persElem) =>
                  persElem.name.toLowerCase() ===
                  personalInterest.toLowerCase(),
              );
              if (!existingPersonalInterest) {
                persInterestObj = await createInterest({
                  interest_type: "personal",
                  name: personalInterest,
                });
              } else {
                persInterestObj = existingPersonalInterest;
              }
            } else {
              persInterestObj = personalInterest;
            }
            const exist_response = await checkMemberInterestExists({
              uin: response.uin,
              interest_id: persInterestObj.id,
            });

            if (!exist_response) {
              const creation_response = await createMemberInterest({
                uin: response.uin,
                interest_id: persInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add personal interests"); // Set error if personal interest addition fails
        }

        try {
          // Add new career interests
          for (const careerInterest of selectedCareerInterests) {
            let carInterestObj;
            if (typeof careerInterest === "string") {
              const existingCareerInterest = careerInterests.find(
                (carElem) =>
                  carElem.name.toLowerCase() === careerInterest.toLowerCase(),
              );
              if (!existingCareerInterest) {
                carInterestObj = await createInterest({
                  interest_type: "career",
                  name: careerInterest,
                });
              } else {
                carInterestObj = existingCareerInterest;
              }
            } else {
              carInterestObj = careerInterest;
            }
            const exist_response = await checkMemberInterestExists({
              uin: response.uin,
              interest_id: carInterestObj.id,
            });

            if (!exist_response) {
              const creation_response = await createMemberInterest({
                uin: response.uin,
                interest_id: carInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add career interests"); // Set error if career interest addition fails
        }

        try {
          // Add new company interests
          for (const companyInterest of selectedCompanyInterests) {
            let compInterestObj;
            if (typeof companyInterest === "string") {
              const existingCompanyInterest = companyInterests.find(
                (compElem) =>
                  compElem.name.toLowerCase() === companyInterest.toLowerCase(),
              );
              if (!existingCompanyInterest) {
                compInterestObj = await createInterest({
                  interest_type: "company",
                  name: companyInterest,
                });
              } else {
                compInterestObj = existingCompanyInterest;
              }
            } else {
              compInterestObj = companyInterest;
            }
            const exist_response = await checkMemberInterestExists({
              uin: response.uin,
              interest_id: compInterestObj.id,
            });

            if (!exist_response) {
              const creation_response = await createMemberInterest({
                uin: response.uin,
                interest_id: compInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add company interests"); // Set error if company interest addition fails
        }

        // Navigate back to the Member page after successful update
        setUser(updatedUser);

        if (isProfile) {
          router.push(`/Profile`);
          setIsEdit(false);
        } else {
          router.push(`/Member`);
        }
      } catch (error) {
        console.error("Failed to update user:", error);
        setError("Failed to update user."); // Set error if user update fails
      }
    }
  };

  /**
   * handleChange Function
   *
   * @description Handles changes to form input fields. Updates the corresponding field in the user state.
   *
   * @param {string} field - The field name being updated (e.g., `name` or `ddate`).
   * @param {string|Date} value - The new value for the field.
   */
  const handleChange = (field, value) => {
    setUser((prevProject) => ({
      ...prevProject,
      [field]: value, // Update the field in the project state with the new value.
    }));
  };

  // Loading and error states for the UI
  if (loading) return <ProgressLoading />;
  if (error) return <div>Error loading user data. {error.message} </div>;

  return (
    <Box sx={{ maxWidth: "md", margin: isEdit ? "0px" : "0 auto" }}>
      {/* <Typography variant="h5" sx={{ marginBottom: "20px" }} gutterBottom>
        Edit User
      </Typography> */}
      <UserForm
        user={user}
        loading={loading}
        error={error}
        formError={formError}
        onChange={handleChange}
        onSubmit={handleSubmit}
        handleCancel={handleCancel}
        dietaryRestrictions={dietaryRestrictions}
        handleDietaryRestrictionChange={handleDietaryRestrictionChange}
        selectedDietaryRestrictions={selectedDietaryRestrictions}
        personalInterests={personalInterests}
        handlePersonalInterestRestrictionChange={
          handlePersonalInterestRestrictionChange
        }
        selectedPersonalInterests={selectedPersonalInterests}
        careerInterests={careerInterests}
        handleCareerInterestRestrictionChange={
          handleCareerInterestRestrictionChange
        }
        selectedCareerInterests={selectedCareerInterests}
        companyInterests={companyInterests}
        handleCompanyInterestRestrictionChange={
          handleCompanyInterestRestrictionChange
        }
        selectedCompanyInterests={selectedCompanyInterests}
        edit={true}
      />
    </Box>
  );
}

export default UserEditTemplate;
