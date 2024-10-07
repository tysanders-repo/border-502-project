"use client"; // Ensures this component runs on the client side.

/**
 * @file NewProjectFormTemplate.jsx
 * @description This component provides a form interface for creating new projects in the system.
 * It manages project data state, validates form input, and handles the submission of new projects.
 * On successful submission, the user is redirected to the new project's detail page.
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation.
import { createProject } from "@services/projectService"; // Service function to handle project creation.
import { Container, Typography } from "@mui/material";
import ProjectForm from "@components/organisms/ProjectForm/ProjectForm"; // Form component for project details.
import ProgressLoading from "@components/organisms/ProgressLoading"; // Loading indicator component for async operations.

/**
 * NewProjectFormTemplate Component
 *
 * @component
 * @description Renders a form for creating new projects with fields for project details like title, description, and images.
 * It manages form state, handles form submission, and provides feedback for loading and errors.
 *
 * @returns {JSX.Element} A form for creating new projects with inputs for project details.
 */
function NewProjectFormTemplate() {
  // State variables for managing project details, loading status, and errors.
  const [project, setProject] = useState({
    title: "",
    description: "",
    date: null,
    pictures: null,
    timeline: null,
    images: [],
  });
  const [loading, setLoading] = useState(false); // Tracks the loading state during form submission.
  const [error, setError] = useState(null); // Stores error messages, if any.
  const [formError, setFormError] = useState({ name: false }); // Tracks form validation errors.

  const router = useRouter(); // Next.js router for handling navigation.

  /**
   * handleCancel Function
   *
   * @description Redirects the user back to the Projects page when the cancel button is clicked.
   */
  const handleCancel = async () => {
    router.push(`/Project`);
  };

  /**
   * useEffect Hook
   *
   * @description Logs the current state of the project to the console whenever it changes.
   * This hook can be useful for debugging purposes.
   */
  useEffect(() => {
    console.log(project); // Log project state whenever it changes.
  }, [project]);

  /**
   * handleImageChange Function
   *
   * @description Updates the project state with an array of selected image files.
   * Converts the FileList into an array and updates the corresponding field in the project state.
   *
   * @param {string} field - The name of the field to update (e.g., 'images').
   * @param {FileList} files - The list of image files selected by the user.
   */
  const handleImageChange = (field, files) => {
    const fileArray = Array.from(files); // Convert FileList to array.
    setProject((prevProject) => ({
      ...prevProject,
      [field]: fileArray,
    }));
  };

  /**
   * handleSubmit Function
   *
   * @description Handles form submission by sending the project data to the `createProject` service.
   * If the submission is successful, the user is redirected to the newly created project's detail page.
   * In case of an error, an error message is displayed.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    setLoading(true); // Set loading state to true.
    try {
      const data = await createProject(project); // Call service to create a new project.
      router.push(`/Project/${data.id}`); // Redirect to the project's detail page if successful.
    } catch (error) {
      // Set error message and log to console in case of failure.
      setError("Failed to create project.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state after request completes.
    }
  };

  /**
   * handleChange Function
   *
   * @description Updates the state of the form fields based on user input.
   *
   * @param {string} field - The name of the field being updated (e.g., 'title').
   * @param {any} value - The new value for the field.
   */
  const handleChange = (field, value) => {
    setProject((prevProject) => {
      const updatedProject = { ...prevProject, [field]: value };
      return updatedProject;
    });
  };

  /**
   * validateForm Function
   *
   * @description Placeholder function to validate form fields. Can be extended for more complex validations.
   *
   * @returns {boolean} - Returns `true` if the form is valid, otherwise `false`.
   */
  const validateForm = () => {
    return true; // Placeholder return value for demo purposes.
    // Uncomment below for basic validation example.
    // const errors = { name: false };
    // if (project.title.trim() === '') {
    //   errors.name = true; // Set name error to true if title field is empty.
    // }
    // setFormError(errors);
    // return !errors.name; // Return true if no errors are present.
  };

  // Render a loading indicator when the form is submitting.
  if (loading) {
    return <ProgressLoading />;
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      {/* Page heading */}
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Project
      </Typography>

      {/* ProjectForm component for capturing project details */}
      <ProjectForm
        project={project}
        loading={loading}
        error={error}
        formError={formError}
        onChange={handleChange}
        onSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleImageChange={handleImageChange}
      />
    </Container>
  );
}

export default NewProjectFormTemplate;
