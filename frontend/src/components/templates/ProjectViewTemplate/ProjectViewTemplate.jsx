"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation.
import { fetchProject } from "@services/projectService"; // Service function to fetch a project by ID.
import { format } from "date-fns";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ProgressLoading from "@components/organisms/ProgressLoading";
import { Container, Typography, Alert, Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * ProjectViewTemplate Component
 *
 *  Displays the detailed view of a project, including its title, description, images, and date. It fetches project data from the server using the provided project ID.
 *
 * @param {Object} props - The component's props object.
 * @param {Object} props.params - The route parameters containing the project ID.
 * @returns {JSX.Element} A detailed project view.
 */
function ProjectViewTemplate({ params }) {
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

  const router = useRouter(); // Next.js router for handling navigation.
  const { id } = params; // Destructure `id` from the route parameters.

  /**
   * useEffect Hook
   *
   * @description Fetches the project details from the server when the component is mounted or when the `id` changes.
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

  // If the data is still loading, show a loading spinner.
  if (loading) return <ProgressLoading />;

  // If an error occurred while fetching data, display an error message.
  if (error)
    return (
      <Alert severity="error">Error fetching project: {error.message}</Alert>
    );

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {project ? (
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
          {/* Back button to navigate to the homepage */}
          <IconButton onClick={() => router.push("/")}>
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ width: "100%" }}>
            {/* Project title */}
            <Typography variant="h4" gutterBottom role="title">
              {project.title}
            </Typography>

            {/* Image gallery */}
            <ImageList
              sx={{ width: "100%", height: "100%" }}
              cols={2}
              rowHeight={400}
              slotProps={{
                root: {
                  sx: {
                    border: "1px solid #e0e0e0",
                  },
                },
              }}
            >
              {project.image_urls?.map((image) => (
                <ImageListItem key={image.id}>
                  <img
                    src={image.url}
                    alt={`preview ${image.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>

            {/* Project start date */}
            <Typography variant="h6" role="start">
              Start Date:
              {project.date
                ? format(new Date(project.date), "MMMM d, yyyy")
                : "N/A"}
            </Typography>

            {/* Project description */}
            <Typography variant="h6" role="description">
              Description: {project.description}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6">Project not found</Typography>
      )}
    </Container>
  );
}

export default ProjectViewTemplate;
