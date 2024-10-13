"use client"; // Ensures this component runs on the client side.

/**
 * @file NewMemberFormTemplate.jsx
 * @description This component provides a form interface for creating new members in the system.
 * It manages form state, validates input, and submits data by calling the `createUser` service.
 * The component also utilizes the Next.js router to navigate to different pages based on form submission results.
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@services/userService";
import UserForm from "@components/organisms/UserForm";
import { Container, Typography } from "@mui/material";
import { validateUserForm } from "@components/organisms/UserForm/validateUserForm";
import {
  fetchAllDietRestrictions,
  createDietaryRestriction,
} from "@services/dietService";
import {
  createMemberDiet,
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
} from "@services/memberInterestService";
import ProgressLoading from "@components/organisms/ProgressLoading";

/**
 * NewMemberFormTemplate Component
 *
 * Renders a form for creating new members with input fields for user details such as name, email, and UIN.
 * It manages form submission, validates user input, and displays error messages when applicable.
 *
 * @returns {JSX.Element} A form for registering new members.
 */
function NewMemberFormTemplate() {
  // State variables for form fields and error handling.
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
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({ first_name: false, uin: false });
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] =
    useState([]);
  const [personalInterests, setPersonalInterests] = useState([]);
  const [selectedPersonalInterests, setSelectedPersonalInterests] = useState(
    []
  );
  const [companyInterests, setCompanyInterests] = useState([]);
  const [selectedCompanyInterests, setSelectedCompanyInterests] = useState([]);
  const [careerInterests, setCareerInterests] = useState([]);
  const [selectedCareerInterests, setSelectedCareerInterests] = useState([]);

  useEffect(() => {
    // Fetch all necessary data for the form
    const fetchData = async () => {
      try {
        const [
          restrictions,
          personalInterests,
          careerInterests,
          companyInterests,
        ] = await Promise.all([
          fetchAllDietRestrictions(),
          fetchAllPersonalInterests(),
          fetchAllCareerInterests(),
          fetchAllCompanyInterests(),
        ]);

        setDietaryRestrictions(restrictions);
        setPersonalInterests(personalInterests);
        setCareerInterests(careerInterests);
        setCompanyInterests(companyInterests);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Reset loading state after data fetching
      }
    };

    fetchData();
  }, []);

  // Handlers for dietary restriction and interest selection changes
  /**
   * Handles changes to dietary restriction selections.
   *
   * @param {React.ChangeEvent<{}>} event - The event object.
   * @param {Array<string>} newValue - The new dietary restrictions selected.
   */
  const handleDietaryRestrictionChange = (event, newValue) => {
    setSelectedDietaryRestrictions(newValue);
  };

  /**
   * Handles changes to personal interest selections.
   *
   * @param {React.ChangeEvent<{}>} event - The event object.
   * @param {Array<string>} newValue - The new personal interests selected.
   */
  const handlePersonalInterestRestrictionChange = (event, newValue) => {
    setSelectedPersonalInterests(newValue);
  };

  /**
   * Handles changes to career interest selections.
   *
   * @param {React.ChangeEvent<{}>} event - The event object.
   * @param {Array<string>} newValue - The new career interests selected.
   */
  const handleCareerInterestRestrictionChange = (event, newValue) => {
    setSelectedCareerInterests(newValue);
  };

  /**
   * Handles changes to company interest selections.
   *
   * @param {React.ChangeEvent<{}>} event - The event object.
   * @param {Array<string>} newValue - The new company interests selected.
   */
  const handleCompanyInterestRestrictionChange = (event, newValue) => {
    setSelectedCompanyInterests(newValue);
  };

  // Data structure for user information to be submitted to the API
  const userData = {
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

  const router = useRouter(); // Next.js router for navigation.

  /**
   * Redirects the user to the homepage when the cancel button is clicked.
   *
   * @returns {void}
   */
  const handleCancel = () => {
    router.push(`/`);
  };

  /**
   * Handles form submission by validating user input and sending a request to create a new user.
   * If the request is successful, redirects the user to the newly created member's details page.
   * Displays an error message in case of failure.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    if (validateUserForm(user, setFormError)) {
      setLoading(true); // Set loading state to true.
      setError(null); // Reset error state.
      try {
        const newUser = await createUser(userData);

        // Create dietary restrictions for the new user
        await Promise.all(
          selectedDietaryRestrictions.map(async (restriction) => {
            let restrictionObject;
            if (typeof restriction === "string") {
              const existingRestriction = dietaryRestrictions.find(
                (restrictions) =>
                  restrictions.item_name.toLowerCase() ===
                  restriction.toLowerCase()
              );
              restrictionObject =
                existingRestriction ||
                (await createDietaryRestriction({ item_name: restriction }));
            } else {
              restrictionObject = restriction;
            }
            const exists = await checkMemberDietExists(
              newUser.uin,
              restrictionObject.id
            );
            if (!exists) {
              await createMemberDiet({
                uin: newUser.uin,
                item_id: restrictionObject.id,
              });
            }
          })
        );

        // Create personal interests for the new user
        await Promise.all(
          selectedPersonalInterests.map(async (personalInterest) => {
            let persInterestObj;
            if (typeof personalInterest === "string") {
              const existingPersonalInterest = personalInterests.find(
                (persElem) =>
                  persElem.name.toLowerCase() === personalInterest.toLowerCase()
              );
              persInterestObj =
                existingPersonalInterest ||
                (await createInterest({
                  interest_type: "personal",
                  name: personalInterest,
                }));
            } else {
              persInterestObj = personalInterest;
            }
            const exists = await checkMemberInterestExists(
              newUser.uin,
              persInterestObj.id
            );
            if (!exists) {
              await createMemberInterest({
                uin: newUser.uin,
                interest_id: persInterestObj.id,
              });
            }
          })
        );

        // Create career interests for the new user
        await Promise.all(
          selectedCareerInterests.map(async (careerInterest) => {
            let carInterestObj;
            if (typeof careerInterest === "string") {
              const existingCareerInterest = careerInterests.find(
                (carElem) =>
                  carElem.name.toLowerCase() === careerInterest.toLowerCase()
              );
              carInterestObj =
                existingCareerInterest ||
                (await createInterest({
                  interest_type: "career",
                  name: careerInterest,
                }));
            } else {
              carInterestObj = careerInterest;
            }
            const exists = await checkMemberInterestExists(
              newUser.uin,
              carInterestObj.id
            );
            if (!exists) {
              await createMemberInterest({
                uin: newUser.uin,
                interest_id: carInterestObj.id,
              });
            }
          })
        );

        // Create company interests for the new user
        await Promise.all(
          selectedCompanyInterests.map(async (companyInterest) => {
            let compInterestObj;
            if (typeof companyInterest === "string") {
              const existingCompanyInterest = companyInterests.find(
                (compElem) =>
                  compElem.name.toLowerCase() === companyInterest.toLowerCase()
              );
              compInterestObj =
                existingCompanyInterest ||
                (await createInterest({
                  interest_type: "company",
                  name: companyInterest,
                }));
            } else {
              compInterestObj = companyInterest;
            }
            const exists = await checkMemberInterestExists(
              newUser.uin,
              compInterestObj.id
            );
            if (!exists) {
              await createMemberInterest({
                uin: newUser.uin,
                interest_id: compInterestObj.id,
              });
            }
          })
        );

        // Redirect to the member's details page after successful creation
        router.push(`/members/${newUser.uin}`);
      } catch (error) {
        setError(error.message); // Set error message if the creation fails.
      } finally {
        setLoading(false); // Reset loading state after submission.
      }
    }
  };

  if (loading) {
    return <ProgressLoading />; // Show loading indicator while fetching data.
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Member
      </Typography>
      <UserForm
        user={user}
        setUser={setUser}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        formError={formError}
        dietaryRestrictions={dietaryRestrictions}
        selectedDietaryRestrictions={selectedDietaryRestrictions}
        onDietaryRestrictionChange={handleDietaryRestrictionChange}
        personalInterests={personalInterests}
        selectedPersonalInterests={selectedPersonalInterests}
        onPersonalInterestChange={handlePersonalInterestRestrictionChange}
        companyInterests={companyInterests}
        selectedCompanyInterests={selectedCompanyInterests}
        onCompanyInterestChange={handleCompanyInterestRestrictionChange}
        careerInterests={careerInterests}
        selectedCareerInterests={selectedCareerInterests}
        onCareerInterestChange={handleCareerInterestRestrictionChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message if exists */}
    </Container>
  );
}

export default NewMemberFormTemplate;
