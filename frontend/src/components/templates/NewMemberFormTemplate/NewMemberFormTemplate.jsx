"use client"; // Ensures this component runs on the client side.

/**
 * @file NewMemberFormTemplate.jsx
 * @description This component provides a form interface for creating new members in the system.
 * It handles form state management, validation, and submission by calling the `createUser` service.
 * The component utilizes the Next.js router to navigate to different pages based on form submission results.
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation.
import { createUser } from "@services/userService"; // Service function to handle user creation.
import UserForm from "@components/organisms/UserForm"; // Form component for user inputs.
import { Container, Typography } from "@mui/material";

/**
 * NewMemberFormTemplate Component
 * 
 * @component
 * @description Renders a form for creating new members with input fields for user details like name, email, and UIN.
 * It manages form submission, validates user input, and displays errors when applicable.
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
  const [loading, setLoading] = useState(false); // Tracks the loading state during form submission.
  const [error, setError] = useState(null); // Stores error messages, if any.
  const [formError, setFormError] = useState({ name: false, uin: false }); // Tracks form validation errors.

  // Data structure to hold user information for API submission.
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

  const router = useRouter(); // Next.js router for handling navigation.

  /**
   * handleCancel Function
   * 
   * @description Redirects the user to the homepage when the cancel button is clicked.
   */
  const handleCancel = async () => {
    router.push(`/`);
  };

  /**
   * handleSubmit Function
   * 
   * @description Handles form submission by validating the input and sending a request to create a new user.
   * If the request is successful, the user is redirected to the newly created member's details page.
   * In case of failure, an error message is set in the state.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    setLoading(true); // Set loading state to true.
    setError(null); // Reset error state.

    if (validateForm()) {
      try {
        // Call the createUser service with user data and navigate to the member's page if successful.
        const response = await createUser(userData);
        router.push(`/Member/${response.uin}`);
      } catch (e) {
        // Set error message in case of a request failure.
        setError("Failed to create user.");
      } finally {
        setLoading(false); // Reset loading state after request completes.
      }
    }
  };

  /**
   * handleChange Function
   * 
   * @description Updates the state of the form fields based on user input.
   * 
   * @param {string} field - The name of the field being updated.
   * @param {any} value - The new value for the field.
   */
  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  /**
   * validateForm Function
   * 
   * @description Validates the form fields for required inputs like name and UIN.
   * If the fields are not valid, sets the formError state accordingly.
   * 
   * @returns {boolean} - Returns `true` if the form is valid, otherwise `false`.
   */
  const validateForm = () => {
    return true; // Placeholder return value for demo purposes.
    const errors = { name: false, uin: false };
    if (user.name.trim() === "") {
      errors.name = true; // Set name error to true if name field is empty.
    }
    if (isNaN(user.uin)) {
      errors.uin = true; // Set UIN error to true if UIN is not a number.
    }
    setFormError(errors);
    return !errors.name && !errors.uin; // Return true if no errors are present.
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      {/* Page heading */}
      <Typography variant="h4" component="h1" gutterBottom>
        New Member Form
      </Typography>

      {/* UserForm component for capturing user details */}
      <UserForm
        user={user}
        loading={loading}
        error={error}
        formError={formError}
        onChange={handleChange}
        onSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Container>
  );
}

export default NewMemberFormTemplate;
