"use client";
/**
 * @file HomepageTemplate.jsx
 * @description This component renders the homepage for a website, specifically showcasing
 * information about Engineers Without Borders (EWB) and listing various projects.
 * It includes information about the EWB organization, its mission, and project details.
 */
// import Image from 'next/image';
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { fetchAllProjects } from "@services/projectService";
import { format } from "date-fns";
import ProgressLoading from "@components/organisms/ProgressLoading";

/**
 * HomepageTemplate Component
 *
 * Renders the homepage with details about Engineers Without Borders (EWB) and a list of ongoing projects.
 * The component fetches project data from an external service and displays each project with its associated images.
 * It includes loading and error states to manage the UI based on the request status.
 *
 * @returns {JSX.Element} A container with information and a list of projects.
 */
const HomepageTemplate = () => {
  // State variables for managing project data, loading state, and error state.
  const [projects, setProjects] = useState([]); // Stores project data.
  const [loading, setLoading] = useState(true); // Tracks if data is being loaded.
  const [error, setError] = useState(null); // Stores error details, if any occur.

  const router = useRouter(); // Next.js router for navigating between pages.

  /**
   * useEffect Hook
   *
   * This hook loads the project data when the component mounts by calling the fetchAllProjects service.
   * It updates the state variables based on the request's success or failure.
   */
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchAllProjects();
        setProjects(data);
      } catch (e) {
        setError(e); // Set the error state if the request fails.
      } finally {
        setLoading(false); // Set loading to false after the request completes (success or failure).
      }
    };
    loadProjects();
  }, []);

  // If data is still loading, show a circular progress indicator.
  if (loading) {
    return <ProgressLoading />;
  }

  // If an error occurred during data fetching, display an alert with the error message.
  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Container maxWidth="lg">
      {/* Title and introduction about the organization */}
      <Typography variant="h1" gutterBottom>
        Engineering Without Borders
      </Typography>
      <Typography variant="h5" gutterBottom>
        Who We Are
      </Typography>
      <Typography variant="body1">
        Engineers Without Borders-USA (EWB-USA) is a non-profit organization
        that partners with developing communities worldwide in an effort to
        improve their quality of life through sustainable engineering projects.
        By placing an emphasis on sustainability, EWB-USA ensures that its
        projects can be facilitated and maintained by the community well after
        the project is implemented. For more information about EWB-USA, visit:
        <a href="http://ewb-usa.org" target="_blank" rel="noopener noreferrer">
          {" "}
          http://ewb-usa.org
        </a>
        .
      </Typography>
      <br />
      <Typography variant="body1">
        The Engineers Without Borders-USA Texas A&M University Student Chapter
        (EWB-TAMU) is a community of 100+ active students, engineering faculty
        and professional mentors. Of 350 student chapters in the United States,
        EWB-TAMU is among the leaders in number of projects and membership. Our
        members rank among the top engineering students at Texas A&M University
        and have a passion for service. EWB-TAMU members maintain a rigorous
        class schedule while attending weekly officer and project meetings,
        monthly chapter meetings, and various training sessions throughout the
        year. Our mission is to deliver sustainable and innovative solutions to
        real-world problems in order to empower international communities by
        offering opportunities for the students of Texas A&M University to:
      </Typography>
      <br />

      {/* Section to display projects */}
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      {/* Display a list of projects */}
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          flexDirection: "column",
        }}
      >
        {projects &&
          projects.map((project) => (
            <Box
              key={project.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                backgroundColor: "#f0f0f0",
                padding: "30px",
                borderRadius: "10px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: "20px",
                }}
              >
                {/* Display project details like title and description */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                  }}
                >
                  <Typography variant="h5">
                    {project.title} -{" "}
                    {format(new Date(project.date), "MMMM d, yyyy")}
                  </Typography>
                  <Typography variant="body1">{project.description}</Typography>
                </Box>

                {/* Display a list of images related to the project */}
                <div style={{ height: "100%", overflow: "hidden" }}>
                  <ImageList
                    sx={{ width: "100%", height: "100%" }}
                    cols={2}
                    rowHeight={250}
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
                </div>
              </Box>
              {/* Button to view more details about a specific project */}
              <Button
                onClick={() => router.push(`/Project/${project.id}/View`)}
                variant="outlined"
                sx={{ width: "250px" }}
              >
                View More
              </Button>
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default HomepageTemplate;
