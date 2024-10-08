"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchAllProjects } from "@services/projectService";
import DeleteProjectDialog from "@components/organisms/DeleteProjectDialog";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { format } from "date-fns";

import {
  CircularProgress,
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

function ProjectListTemplate() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "date",
      headerName: "Start Date",
      flex: 1,
      renderCell: (params) => format(new Date(params.value), "MMMM d, yyyy"),
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
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                },
              },
            }}
          >
            <MenuItem
              component={Link}
              href={`/Project/${selectedProject?.id}`}
              onClick={handleCloseMenu}
            >
              View
            </MenuItem>
            <MenuItem
              component={Link}
              href={`/Project/${selectedProject?.id}/Edit`}
              onClick={handleCloseMenu}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  const loadProjects = async () => {
    try {
      const data = await fetchAllProjects();
      setProjects(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleMenuClick = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  if (loading) {
    return <CircularProgress />;
  }

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
          margin: "0 auto",
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
          <Typography variant="h4">Projects</Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={() => router.push("/Member")}
              startIcon={<ManageAccountsIcon />}
            >
              {isMobile ? "Members" : "Manage Members"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => router.push("Project/New")}
            >
              {isMobile ? "Project" : "Add Project"}
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
        onDelete={loadProjects}
      />
    </>
  );
}

export default ProjectListTemplate;
