"use client"; // Marks this component for client-side rendering in Next.js

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  fetchAllProjects,
  updateProject
 } from "@services/projectService";
import DeleteProjectDialog from "@components/organisms/DeleteProjectDialog";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { format } from "date-fns";
import { projectService } from "@services/projectService";
import {
  Alert,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ProgressLoading from "@components/organisms/ProgressLoading";
import CopySnackbar from "@components/organisms/CopySnackbar";
import { handleCopyClick } from "@utils/functions";
import { getUserRole } from "@services/authService";
import MilestoneDialog from "./MilestoneDialog";

/**
 * ProjectListTemplate component
 * This component displays a list of projects. It fetches project data from the server, shows it in a table, and provides options to view, edit, or delete projects.
 * @returns {JSX.Element} A list view for projects with options to manage them.
 */
function ProjectListTemplate() {
  const [projects, setProjects] = useState([]); // State to manage the list of projects.
  const [loading, setLoading] = useState(true); // State to manage loading status.
  const [error, setError] = useState(null); // State to manage error messages.
  const [anchorEl, setAnchorEl] = useState(null); // State for managing the anchor element of the menu.
  const [selectedProject, setSelectedProject] = useState(null); // State for managing the currently selected project for actions.
  const [openDialog, setOpenDialog] = useState(false); // State to manage the open/close state of the delete confirmation dialog.
  const theme = useTheme(); // Hook to access the theme for responsive design.
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Determine if the view is mobile based on the screen size.
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [userAuthorized, setUserAuthorized] = useState(false);
  // milestone context
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);

  const router = useRouter(); // Next.js router for navigation.

  const columns = [
    { field: "title", headerName: "Title", flex: 1 }, // Column definition for project title.
    { field: "description", headerName: "Description", flex: 1 }, // Column definition for project description.
    {
      field: "date",
      headerName: "Start Date",
      flex: 1,
      renderCell: (params) => format(new Date(params.value), "MMMM d, yyyy"), // Format the date for display.
    },
    {
      field: "actions",
      sortable: false,
      hideable: false,
      headerName: "",
      renderCell: (params) => (
        <div>
          <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            slotProps={{
              paper: {
                sx: {
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                },
              },
            }}
          >
            {userAuthorized ? (
              <MenuItem
                component={Link}
                href={`/Project/${selectedProject?.id}/Edit`}
                onClick={handleCloseMenu}
              >
                Edit
              </MenuItem>
            ) : null}
            {userAuthorized ? (
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            ) : null}
            <MenuItem
              component={Link}
              href={`/Project/${selectedProject?.id}`}
              onClick={handleCloseMenu}
            >
              View Page
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleCopyClick(
                  selectedProject.members
                    .map((member) => member.email)
                    .join(", "),
                  setCopyStatus,
                  setSnackbarOpen,
                )
              }
            >
              Copy Emails
            </MenuItem>
            <MenuItem
              onClick={() => {
                setMilestoneDialogOpen(true);
                handleCloseMenu();
              }}
            >
              Edit Milestones
            </MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  /**
   * loadProjects Function
   *
   * @description Fetches all projects from the server and updates the projects state. Handles loading and error states.
   */
  const loadProjectsAndSetAuth = async () => {
    const role = await getUserRole();
    if (role === undefined || role === "member" || role === "none") {
      // Redirect non-admin users to homepage
      router.push("/");
    } else {
      if (role === "project lead" || role === "president" || role === "admin")
        // Only allow president and project lead to edit and delete projects
        setUserAuthorized(true);
      try {
        const data = await fetchAllProjects(); // Fetch project data from the service.
        setProjects(data); // Update projects state with fetched data.
        setLoading(false); // Set loading state to false.
      } catch (e) {
        setError(e); // Set error state if the request fails.
        setLoading(false); // Set loading state to false.
      }
    }
  };

  useEffect(() => {
    loadProjectsAndSetAuth(); // Load projects when the component mounts.
  }, []);

  /**
   * handleMenuClick Function
   *
   * @description Opens the menu for the selected project.
   *
   * @param {MouseEvent} event - The event object from the click event.
   * @param {Object} project - The project object that was clicked.
   */
  const handleMenuClick = (event, project) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu.
    setSelectedProject(project); // Update selected project state.
  };

  /**
   * handleCloseDialog Function
   *
   * @description Closes the delete confirmation dialog.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false); // Set the dialog open state to false.
  };

  /**
   * handleCloseMenu Function
   *
   * @description Closes the actions menu.
   */
  const handleCloseMenu = () => {
    setAnchorEl(null); // Clear the anchor element to close the menu.
  };

  /**
   * handleDeleteClick Function
   *
   * @description Opens the delete confirmation dialog and closes the menu.
   */
  const handleDeleteClick = () => {
    setOpenDialog(true); // Open the delete confirmation dialog.
    handleCloseMenu(); // Close the actions menu.
  };

  /**
   * milestoneHandleClose Function
   * @description Closes the milestone dialog.
   * 
   */
  const milestoneHandleClose = () => {
    setMilestoneDialogOpen(false);
  };

  const handleAccomplishmentsSubmit = async (accomplishments) => {
    try {
      await updateUserPresident(selectedMember.uin, {
        accomplishments: accomplishments,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uin === selectedMember.uin ? { ...user, accomplishments } : user,
        ),
      );
    } catch (error) {
      console.error("Error updating accomplishments:", error);
    }
  };


  const handleMilestoneSubmit = async (milestone) => {
    try {
      await updateProject(selectedProject.id, {
        ...selectedProject,
        timeline: [...selectedProject.timeline, milestone[milestone.length - 1]],
      });

    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  
  
  
  

  // If the data is still loading, show a loading spinner.
  if (loading) {
    return <ProgressLoading />;
  }

  // If an error occurred while fetching data, display an error message.
  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "50px auto",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <Typography variant="h3">Projects</Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            {userAuthorized ? (
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => router.push("Project/New")}
              >
                {isMobile ? "Project" : "Add Project"}
              </Button>
            ) : null}
            <Button
              variant="contained"
              onClick={() => router.push("/Member")}
              startIcon={<ManageAccountsIcon />}
            >
              {isMobile ? "Members" : "Manage Members"}
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      <DeleteProjectDialog
        project={selectedProject}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        id={selectedProject?.id}
        setError={setError}
        onDelete={loadProjectsAndSetAuth} // Callback function to reload projects after deletion.
      />

      <CopySnackbar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        copyStatus={copyStatus}
      />

      <MilestoneDialog
        project={selectedProject}
        open={milestoneDialogOpen}
        onClose={milestoneHandleClose}
        onSubmit={handleMilestoneSubmit}
      />
    </>
  );
}

export default ProjectListTemplate;
