"use client"; // Marks this component for client-side rendering in Next.js

/**
 * @file ProjectEditTemplate.jsx
 * @description This component handles the editing of a project. It fetches the project's existing details, displays them in an editable form, and allows users to make changes, upload new images, and save their modifications.
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { fetchProject, updateProject } from "@services/projectService"; // Service functions to fetch and update project data
import ProjectForm from "@components/organisms/ProjectForm/ProjectForm"; // Form component for editing project details

/**
 * ProjectEditTemplate Component
 *
 * @component
 * @description Displays an editable form for modifying a project's details. It pre-fills the form with existing data and handles form submission, image uploads, and navigation.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.params - The route parameters containing the project ID.
 * @returns {JSX.Element} A form view for editing a project.
 */
function ProjectEditTemplate({ params }) {
  // State variables to manage project data, loading state, error messages, and form validation.
  const [project, setProject] = useState({
    title: "",
    description: "",
    date: null,
    pictures: null,
    timeline: null,
    images: [],
  });
  const [loading, setLoading] = useState(true); // Tracks loading state during data fetch.
  const [error, setError] = useState(null); // Stores error messages if the request fails.
  const [formError, setFormError] = useState({ name: false, uin: false }); // Tracks form validation errors.

  const router = useRouter(); // Next.js router for handling navigation.
  const { id } = params; // Destructure `id` from the route parameters.

  /**
   * useEffect Hook
   *
   * @description Fetches the current project details from the server when the component is mounted or when the `id` changes.
   * It updates the project state or handles errors if the fetch fails.
   */
  useEffect(() => {
    if (!id) return;

    const fetchCurrentProject = async () => {
      try {
        const json = await fetchProject(id); // Fetch project data using the provided ID.
        setProject(json); // Update project state with fetched data.
      } catch (e) {
        setError(e); // Set error state if the request fails.
      } finally {
        setLoading(false); // Set loading state to false.
      }
    };

    fetchCurrentProject();
  }, [id]);

  /**
   * handleImageChange Function
   *
   * @description Handles changes to image file inputs. Updates the `images` field in the project state with the selected files.
   *
   * @param {string} field - The field name being updated (e.g., `images`).
   * @param {FileList} files - The selected files to be uploaded.
   */
  const handleImageChange = (field, files) => {
    const fileArray = Array.from(files);
    setProject((prevProject) => ({
      ...prevProject,
      [field]: fileArray, // Update the field in the project state with the new files.
    }));
  };

  /**
   * handleCancel Function
   *
   * @description Handles the cancel action. Navigates back to the projects list page.
   */
  const handleCancel = () => {
    router.push("/Project");
  };

  /**
   * handleSubmit Function
   *
   * @description Handles form submission. Validates the form, updates the project on the server, and navigates to the project's manage page.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await updateProject(id, project); // Update project data on the server.
        router.push(`/Project/${response.id}`); // Navigate to the manage page of the updated project.
      } catch (e) {
        setError(e); // Set error state if the update fails.
      }
    }
  };

  /**
   * handleChange Function
   *
   * @description Handles changes to form input fields. Updates the corresponding field in the project state.
   *
   * @param {string} field - The field name being updated (e.g., `title` or `description`).
   * @param {string|Date} value - The new value for the field.
   */
  const handleChange = (field, value) => {
    setProject((prevProject) => ({
      ...prevProject,
      [field]: value, // Update the field in the project state with the new value.
    }));
  };

  /**
   * validateForm Function
   *
   * @description Validates the form inputs. Returns `true` if all fields are valid; otherwise, returns `false`.
   * This function can be extended to include actual validation logic.
   *
   * @returns {boolean} True if form is valid; false otherwise.
   */
  const validateForm = () => {
    // Implement form validation logic here, if necessary.
    return true;
  };

  // If the data is still loading, show a loading spinner.
  if (loading) {
    return <CircularProgress role="progressbar" />;
  }

  // If an error occurred while fetching or updating data, display an error message.
  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      {/* Page header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Project - {project.title}
      </Typography>

      {/* Project form for editing project details */}
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

export default ProjectEditTemplate;
