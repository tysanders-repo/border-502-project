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

/**
 * Props for the DeleteProjectDialog component.
 * @typedef {Object} DeleteProjectDialogProps
 * @property {Object} project - The project object containing project details.
 * @property {boolean} openDialog - Indicates whether the dialog is open.
 * @property {function} handleCloseDialog - Function to close the dialog.
 * @property {string} id - ID of the project to be deleted.
 * @property {function} setError - Function to set error state.
 * @property {function} onDelete - Function to be called upon successful deletion.
 */

/**
 * A dialog component for confirming project deletion.
 * @param {DeleteProjectDialogProps} props - The props for the component.
 * @returns {JSX.Element} The rendered DeleteProjectDialog component.
 */
const DeleteProjectDialog = ({
  project, // Project object containing project details
  openDialog, // Boolean to control dialog visibility
  handleCloseDialog, // Function to close the dialog
  id, // ID of the project to be deleted
  setError, // Function to set error state
  onDelete, // New prop to handle deletion
}) => {
  /**
   * Handles the project deletion process.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  const deleteProjectHandler = async () => {
    try {
      // Attempt to delete the project with the provided ID
      await deleteProject(id);
      // Call the onDelete prop to notify parent about the successful deletion
      onDelete();
    } catch (error) {
      // If an error occurs, set the error state
      setError(error);
    }
  };

  return (
    <Dialog
      open={openDialog} // Control the open state of the dialog
      onClose={handleCloseDialog} // Function to call when the dialog is closed
      aria-labelledby="alert-dialog-title" // Accessibility label for the dialog title
      aria-describedby="alert-dialog-description" // Accessibility label for the dialog description
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
            // Call the delete project handler and close the dialog
            deleteProjectHandler(); // Call delete handler
            handleCloseDialog(); // Close the dialog after confirming
          }}
          color="error" // Color for the delete button
          autoFocus // Automatically focus this button when the dialog opens
        >
          Delete Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Exporting the DeleteProjectDialog component for use in other parts of the application
export default DeleteProjectDialog;
