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
import { fetchAllUsers } from "@services/userService";
import { createProjectMember } from "@services/projectMemberService";

/**
 * NewProjectFormTemplate Component.
 *
 * This component renders a form for creating new projects with fields for project details like title, description, and images.
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
    image_urls: [],
  });
  const [loading, setLoading] = useState(false); // Tracks the loading state during form submission.
  const [error, setError] = useState(null); // Stores error messages, if any.
  const [formError, setFormError] = useState({
    title: false,
    date: false,
    description: false,
  });
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await fetchAllUsers();
        setMembers(data);
      } catch(error) {
        console.error("Error fetching members: ", error);
      }
    }

    fetchMembers();
  }, []);

  const handleMembersRestrictionChange = async (event, newValue) => {
    setSelectedMembers(newValue);
  };

  const router = useRouter(); // Next.js router for handling navigation.

  /**
   * Handles redirecting the user back to the Projects page when the cancel button is clicked.
   *
   * @async
   * @function handleCancel
   */
  const handleCancel = async () => {
    router.push(`/Project`);
  };

  /**
   * Updates the project state with an array of selected image files.
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
   * Handles form submission by sending the project data to the `createProject` service.
   * If the submission is successful, the user is redirected to the newly created project's detail page.
   * In case of an error, an error message is displayed.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    const isValid = validateForm(); // Call the validateForm function to check for errors.

    if (!isValid) {
      // If form is not valid, prevent submission and show errors.
      setError("Please fill in all required fields correctly.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await createProject(project); // Call service to create a new project.
      const id = data.id;
      for(const member of selectedMembers){
        try{
          const projectMemberData = {uin: member.uin, project_id: id};
          await createProjectMember(projectMemberData);
        } catch(error) {
          setError("Failed to create project member");
          console.error("Error: ", error);
        }
      }
      router.push(`/Project/${id}`); // Redirect to the project's detail page if successful.
    } catch (error) {
      // Set error message and log to console in case of failure.
      setError("Failed to create project.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state after request completes.
    }
  };

  /**
   * Updates the state of the form fields based on user input.
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
   * Validates form fields.
   *
   * @returns {boolean} - Returns `true` if the form is valid, otherwise `false`.
   */
  const validateForm = () => {
    const errors = {
      title: false,
      date: false,
      description: false,
    };

    if (!project.title) {
      errors.title = true; // Set error for title if it's empty
    }
    if (!project.date) {
      errors.date = true; // Set error for date if it's not provided
    }
    if (!project.description) {
      errors.description = true; // Set error for description if it's empty
    }

    setFormError(errors); // Set form errors to the state.

    return !errors.title && !errors.date && !errors.description;
  };

  // Render a loading indicator when the form is submitting.
  if (loading) {
    return <ProgressLoading />;
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      {/* Page heading */}
      <Typography variant="h4" component="h1" mb="40px">
        Create A New Project
      </Typography>

      {/* ProjectForm component for capturing project details */}
      <ProjectForm
        project={project}
        setProject={setProject}
        projectMembers={projectMembers}
        setProjectMembers={setProjectMembers}
        removedImages={null}
        setRemovedImages={null}
        loading={loading}
        error={error}
        formError={formError}
        onChange={handleChange}
        onSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleImageChange={handleImageChange}
        selectedMembers={selectedMembers}
        members={members}
        handleMembersRestrictionChange={handleMembersRestrictionChange}
      />
    </Container>
  );
}

export default NewProjectFormTemplate;
