import React from "react";
import { useRouter } from "next/navigation";

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
}) => {
  const router = useRouter();

  const deleteProjectHandler = async () => {
    try {
      await deleteProject(id);
      router.push("/Projects");
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
            deleteProjectHandler();
            handleCloseDialog();
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
