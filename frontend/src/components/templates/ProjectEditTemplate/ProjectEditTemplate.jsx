"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { fetchProject, updateProject } from "@services/projectService";
import ProjectForm from "@components/organisms/ProjectForm/ProjectForm";

function ProjectEditTemplate({ params }) {
  const [project, setProject] = useState({
    title: "",
    description: "",
    date: null,
    pictures: null,
    timeline: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({ name: false, uin: false });

  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchCurrentProject = async () => {
      try {
        const json = await fetchProject(id);
        setProject(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentProject();
  }, [id]);

  const handleCancel = () => {
    router.push("/Projects");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await updateProject(id, project);
        router.push(`/Projects/${response.id}`);
      } catch (e) {
        setError(e);
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
  };

  if (loading) {
    return <CircularProgress role="progressbar" />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Project - {project.title}
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

export default ProjectEditTemplate;
