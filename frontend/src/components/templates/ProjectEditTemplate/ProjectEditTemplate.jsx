"use client"; // Marks this component for client-side rendering in Next.js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { Container, Typography, Alert } from "@mui/material";
import { fetchProject, updateProject } from "@services/projectService"; // Service functions to fetch and update project data
import ProjectForm from "@components/organisms/ProjectForm/ProjectForm"; // Form component for editing project details
import ProgressLoading from "@components/organisms/ProgressLoading";
import { fetchAllUsers } from "@services/userService";
import {
  getProjectMembers,
  deleteProjectMember,
  createProjectMember,
  getProjectMembersByProject,
} from "@services/projectMemberService";
import { getUserRole } from "@services/authService";

/**
 * ProjectEditTemplate component
 *
 * This component handles the editing of a project. It fetches the project's existing details, displays them in an editable form, and allows users to make changes, upload new images, and save their modifications.
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
    image_urls: [],
  });
  const [loading, setLoading] = useState(true); // Tracks loading state during data fetch.
  const [error, setError] = useState(null); // Stores error messages if the request fails.
  const [formError, setFormError] = useState({ name: false, uin: false }); // Tracks form validation errors.
  const [removedImages, setRemovedImages] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [prevMembers, setPrevMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await fetchAllUsers();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
      setLoading(false);
    }

    fetchMembers();
  }, []);

  // Only sets array equal to new one if the new one deleted a member, or if the member added exists
  const handleMembersRestrictionChange = async (event, newValue) => {
    if (newValue.length < selectedMembers.length) {
      setSelectedMembers(newValue);
    } else if (
      newValue.length > 0 &&
      members.includes(newValue[newValue.length - 1])
    ) {
      setSelectedMembers(newValue);
    }
  };

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
      const role = await getUserRole();
      if (role !== "project lead" && role !== "president") {
        // Redirect non-admin users to homepage
        router.push("/");
      } else {
        try {
          const json = await fetchProject(id); // Fetch project data using the provided ID.
          setProject(json); // Update project state with fetched data.
          try {
            const members = await getProjectMembers(id);
            setSelectedMembers(members);
            setPrevMembers(members);
          } catch (e) {
            setError(e);
          }
          try {
            const data = await fetchAllUsers();
            setMembers(data);
          } catch (error) {
            console.error("Error fetching members: ", error);
          }
        } catch (e) {
          setError(e); // Set error state if the request fails.
        } finally {
          setLoading(false); // Set loading state to false.
        }
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
      [field]: [...(prevProject[field] || []), ...fileArray], // Merge current files with new files.
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
        const response = await updateProject(id, project, removedImages); // Update project data on the server.
        let projectMembersDelete = [];
        let projectMembersCreate = [];
        // O(NM) but it doesn't matter because these arrays won't have many elements...
        // Also didn't want to delete and create the project members again
        for (const member of selectedMembers) {
          if (!prevMembers.includes(member)) {
            projectMembersCreate.push(member);
          }
        }
        for (const member of prevMembers) {
          if (!selectedMembers.includes(member)) {
            projectMembersDelete.push(member);
          }
        }
        const projectMembers = await getProjectMembersByProject(id);
        for (const member of projectMembersDelete) {
          for (const pMember of projectMembers) {
            if (member.uin === pMember.uin) {
              try {
                await deleteProjectMember(pMember.id);
              } catch (e) {
                setError(e);
              }
            }
          }
        }
        for (const member of projectMembersCreate) {
          try {
            const projectMemberData = { uin: member.uin, project_id: id };
            await createProjectMember(projectMemberData);
          } catch (e) {
            setError(e);
          }
        }
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

  // If the data is still loading, show a loading spinner.
  if (loading) {
    return <ProgressLoading />;
  }

  // If an error occurred while fetching or updating data, display an error message.
  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", margin: "50px auto" }}>
      {/* Page header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Project - {project.title}
      </Typography>

      {/* Project form for editing project details */}
      <ProjectForm
        project={project}
        setProject={setProject}
        removedImages={removedImages}
        setRemovedImages={setRemovedImages}
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

export default ProjectEditTemplate;
