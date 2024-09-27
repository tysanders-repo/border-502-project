"use client"; // Marks this component as client-side in Next.js

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { createProject } from "@services/projectService"; // Adjust the import path based on your structure
import { Container, Typography } from "@mui/material";
import ProjectForm from "@components/organisms/ProjectForm/ProjectForm"; // Adjust the import path based on your structure

function NewProjectFormTemplate() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    date: null,
    pictures: null,
    timeline: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({ name: false, uin: false });

  const router = useRouter(); // Next.js hook for navigation

  const handleCancel = async () => {
    router.push(`/Projects`); // Navigate to the projects page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (validateForm()) {
      try {
        const response = await createProject(project);
        router.push(`/Projects/${response.id}`); // Navigate to the new project page
      } catch (e) {
        setError("Failed to create project.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (field, value) => {
    setProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }));
  };

  const validateForm = () => {
    return true;
    // const errors = { name: false };
    // if (project.title.trim() === '') {
    //   errors.name = true;
    // }
    // setFormError(errors);
    // return !errors.name;
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Project
      </Typography>
      <ProjectForm
        project={project}
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

export default NewProjectFormTemplate;
