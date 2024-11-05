import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteProject } from "@services/projectService";

const DeleteProjectDialog = ({
  project,
  openDialog,
  handleCloseDialog,
  id,
  setError,
  onDelete, 
}) => {
  const deleteProjectHandler = async () => {
    try {
      await deleteProject(id);
      onDelete(); 
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm Delete Project</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the {project?.title} project? This
          action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            deleteProjectHandler(); // Call delete handler
            handleCloseDialog(); // Close the dialog after confirming
          }}
          color="error"
          autoFocus
        >
          Delete Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProjectDialog;
