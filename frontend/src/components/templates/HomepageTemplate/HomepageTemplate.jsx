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
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { fetchAllProjects } from "@services/projectService";
import { format } from "date-fns";
import { useTheme, useMediaQuery } from "@mui/material";
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
  const theme = useTheme();
  const router = useRouter(); // Next.js router for navigating between pages.
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    return <ProgressLoading role="progressbar" />;
  }

  // If an error occurred during data fetching, display an alert with the error message.
  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  console.log(projects);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url('./homepage1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "100px",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          },
        }}
      >
        <Grid container spacing={5} sx={{ zIndex: 2 }}>
          <Grid size={{ s: 12, md: 5 }}>
            <Typography variant="h1">Engineering Without Borders</Typography>
            <Typography variant="h2" sx={{ fontSize: "1.5rem" }}>
              Texas A&M Chapter
            </Typography>
          </Grid>
          <Grid size={{ s: 12, md: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant="h3">Our Mission</Typography>
              <Divider
                sx={{
                  width: "70%",
                  opacity: "100%",
                  border: "0.5px solid white",
                }}
              />
              <Typography variant="h5">
                EWB-TAMU is dedicated to improving quality of life in developing
                communities through sustainable engineering projects while
                empowering students to gain hands-on experience
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          padding: "30px",
          color: theme.palette.text.primary,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: isMobile ? "center" : "flex-start",
          gap: "30px",
        }}
      >
        <img
          src="./homepage2.png"
          style={{
            maxWidth: "500px",
            width: "100%",
            height: "auto",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{ color: theme.palette.primary.main, marginTop: "20px" }}
          >
            Who We Are
          </Typography>
          <Typography variant="body1">
            Engineers Without Borders-USA (EWB-USA) is a non-profit organization
            that partners with developing communities worldwide to improve
            theirhomepage3 quality of life through sustainable engineering
            projects. By emphasizing sustainability, EWB-USA ensures that its
            projects can be facilitated and maintained by the community well
            after implementation. For more information about EWB-USA, visit:
            <a
              href="http://ewb-usa.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://ewb-usa.org
            </a>
            .
          </Typography>
          <br />
          <Typography variant="body1">
            The Engineers Without Borders-USA Texas A&M University Student
            Chapter (EWB-TAMU) is a community of 100+ active students,
            engineering faculty, and professional mentors. Of 350 student
            chapters in the United States, EWB-TAMU is among the leaders in
            projects and membership. Our members rank among the top engineering
            students at Texas A&M University and have a passion for service.
            EWB-TAMU members maintain a rigorous class schedule while attending
            weekly officer and project meetings, monthly chapter meetings, and
            various training sessions throughout the year. Our mission is to
            deliver sustainable and innovative solutions to real-world problems,
            empowering international communities by offering opportunities for
            the students of Texas A&M University to:
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.65)", // Dark overlay
            zIndex: 1,
          },
        }}
      >
        <Grid container>
          <Grid item size={2}>
            <img
              src="./homepage3.png"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="Description of homepage3"
            />
          </Grid>
          <Grid item size={2}>
            <img
              src="./homepage4.png"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="Description of homepage4"
            />
          </Grid>
          <Grid item size={2}>
            <img
              src="./homepage5.png"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="Description of homepage5"
            />
          </Grid>
          <Grid item size={2}>
            <img
              src="./homepage6.png"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="Description of homepage6"
            />
          </Grid>
          <Grid item size={2}>
            <img
              src="./homepage7.png"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="Description of homepage7"
            />
          </Grid>
          <Grid item size={2}>
            <img
              key={"Image 1"}
              src="./homepage8.png"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="Description of homepage8"
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            zIndex: 2,
            width: "70%",
          }}
        >
          <Typography variant="h1">Our Projects</Typography>
          {!isMobile && (
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              At Engineers Without Borders-USA, we partner with communities to
              deliver sustainable engineering solutions that address critical
              issues like clean water access and renewable energy. Our dedicated
              teams work closely with local stakeholders to create tailored
              projects that foster self-sufficiency and lasting impact. Join us
              in making a difference!
            </Typography>
          )}
        </Box>
      </Box>

      {/* Display a list of projects */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {projects &&
          projects.map((project, index) => (
            <Box
              key={`Project ${index}`}
              sx={{
                display: "flex",
                flexDirection: index % 2 === 0 ? "row-reverse" : "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ width: "50%" }}>
                {project.image_urls?.length > 0 ? (
                  <img
                    key={`Image ${index}`}
                    src={project.image_urls[0]?.url}
                    alt={project.title} // Add alt text for accessibility
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    key={`placeholder ${index}`}
                    src={"./placeholder.png"}
                    alt="Placeholder project image"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
              {/* Display project details like title and description */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                <Box sx={{ padding: "30px" }}>
                  <Typography
                    variant="h4"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="overline"
                    sx={{ color: theme.palette.text.main }}
                  >
                    {format(new Date(project.date), "MMMM d, yyyy")}
                  </Typography>
                  {!isMobile && (
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.main }}
                    >
                      {project.description?.length > 250
                        ? `${project.description.slice(0, 250)}...`
                        : project.description}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => router.push(`/Project/${project.id}/View`)}
                    variant="outlined"
                    sx={{ width: "150px" }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default HomepageTemplate;
