"use client"; // Marks this component for client-side rendering in Next.js

/**
 * @file ProjectDetailsTemplate.jsx
 * @description This component displays the details of a specific project, including title, description, images, and options to edit or delete the project.
 * It fetches the project data based on the provided ID, handles loading and error states, and manages the delete dialog state.
 */
// import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { fetchProject } from "@services/projectService"; // Service function to fetch a project by ID
import DeleteProjectDialog from "@components/organisms/DeleteProjectDialog"; // Dialog component for confirming project deletion
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { format } from "date-fns";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ProgressLoading from "@components/organisms/ProgressLoading";

import {
  Button,
  Container,
  Typography,
  Alert,
  Box,
  IconButton,
} from "@mui/material";

/**
 * ProjectDetailsTemplate Component
 *
 * This component displays the details of a selected project, including project title, description, and images.
 * The component allows users to edit or delete the project and handles navigation and dialog visibility.
 *
 * @param {Object} props - The route parameters containing the project ID.
 * @returns {JSX.Element} A detailed view of the selected project.
 */
function ProjectDetailsTemplate({ params }) {
  // State variables to manage project data, loading state, error messages, and dialog visibility.
  const [project, setProject] = useState({
    title: "",
    description: "",
    date: null,
    pictures: null,
    timeline: null,
    images: [],
  });
  const [loading, setLoading] = useState(true); // Tracks the loading state during data fetch.
  const [error, setError] = useState(null); // Stores error messages, if any.
  const [openDialog, setOpenDialog] = useState(false); // Tracks visibility of the delete confirmation dialog.

  const router = useRouter(); // Next.js router for handling navigation.
  const { id } = params; // Destructure `id` from the route parameters.

  /**
   * useEffect Hook
   *
   * Fetches the project details from the server when the component is mounted or when the `id` changes.
   * It sets the project data or handles errors if the fetch fails.
   */
  useEffect(() => {
    const fetchCurrentProject = async () => {
      try {
        const json = await fetchProject(id); // Fetch project data using the provided ID.
        setProject(json); // Update project state with fetched data.
        setLoading(false); // Set loading state to false.
      } catch (error) {
        setError(error); // Set error state if the request fails.
        setLoading(false); // Set loading state to false.
      }
    };

    fetchCurrentProject();
  }, [id]);

  /**
   * handleOpenDialog Function
   *
   * Opens the delete confirmation dialog.
   */
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  /**
   * handleCloseDialog Function
   *
   * Closes the delete confirmation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // If the data is still loading, show a loading spinner.
  if (loading) return <ProgressLoading />;

  // If an error occurred while fetching data, display an error message.
  if (error)
    return (
      <Alert severity="error">Error fetching project: {error.message}</Alert>
    );

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {project ? (
        // Main container for project details and actions.
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          {/* Back button to navigate to the Projects list page */}
          <IconButton onClick={() => router.push("/Project")} aria-label="back">
            <ArrowBackIcon />
          </IconButton>

          {/* Project details container */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Project title */}
            <Typography variant="h3" aria-label="title">
              {project.title} Details
            </Typography>

            {/* Project start date */}
            <Typography variant="h5" aria-label="start">
              Start Date: {format(new Date(project.date), "MMMM d, yyyy")}
            </Typography>

            {/* Project description */}
            <Typography variant="h6" aria-label="description">
              Description: {project.description}
            </Typography>

            <Typography variant="h5" aria-label="description">
              Images:
            </Typography>

            {/* Image gallery */}
            <ImageList
              sx={{ width: "100%", height: "100%" }}
              cols={2}
              rowHeight={200}
            >
              {project.image_urls?.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image.url}
                    alt={`preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>

            {/* Action buttons for editing and deleting the project */}
            <Box
              mt={3}
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleOpenDialog}
                sx={{ minWidth: "100px" }}
              >
                Delete
              </Button>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push(`/Project/${id}/Edit`)}
                  sx={{ minWidth: "100px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/Project/${id}/View`)}
                  sx={{ minWidth: "100px" }}
                >
                  View
                </Button>
              </Box>
            </Box>

            {/* Delete confirmation dialog */}
            <DeleteProjectDialog
              project={project}
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              id={id}
              setError={setError}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="h6">Project not found</Typography>
      )}
    </Container>
  );
}

export default ProjectDetailsTemplate;
