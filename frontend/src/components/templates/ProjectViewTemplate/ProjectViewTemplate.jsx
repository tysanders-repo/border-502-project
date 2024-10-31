"use client";
// import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation.
import { fetchProject } from "@services/projectService"; // Service function to fetch a project by ID.
import { format } from "date-fns";
import Grid from "@mui/material/Grid2";
import ProgressLoading from "@components/organisms/ProgressLoading";
import {
  Typography,
  Divider,
  Alert,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ImageCarousel from "@components/organisms/ImageCarousel";
import { BackgroundBox, DescriptionBox } from "./ProjectViewTemplate.styles";
import { useTheme } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
  const theme = useTheme();

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
    <Box>
      <BackgroundBox project={project}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            zIndex: 2,
            width: "80%",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => router.push("/")}
              sx={{ width: "30px", height: "30px" }}
            >
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: 2,
              }}
            >
              <Typography variant="h1"> {project.title}</Typography>
              <Divider
                sx={{
                  width: "70%",
                  opacity: "100%",
                  border: "0.5px solid white",
                }}
              />
              <Typography variant="h5">
                Started {format(new Date(project.date), "MMMM d, yyyy")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BackgroundBox>

      <Grid container sx={{ margin: "35px" }}>
        <Grid item size={{ s: 12, md: 6 }} sx={{ maxHeight: "450px" }}>
          <ImageCarousel images={project.image_urls} />
        </Grid>
        <Grid item size={{ s: 12, md: 6 }} sx={{ padding: "20px" }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            About This Project
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "justify" }}>
            {project.description}
          </Typography>
        </Grid>
      </Grid>

      <DescriptionBox>
        <Box>
          <Typography gutterBottom variant="h4" sx={{ textAlign: "center" }}>
            Members
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {project.members.map((member) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{ color: "black", textTransform: "capitalize" }}
                  onClick={() => router.push(`/Member/${member.uin}`)}
                  startIcon={<Person2Icon />}
                  endIcon={<KeyboardArrowRightIcon sx={{ fontSize: "40px" }} />}
                >
                  <Typography key={member.uin} variant="h5">
                    {member.first_name} {member.last_name}
                  </Typography>
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, bgcolor: theme.palette.primary.main }}
        />
        <Box>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Important Updates
          </Typography>
        </Box>
      </DescriptionBox>
    </Box>
  );
}

export default ProjectViewTemplate;
