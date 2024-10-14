import React from "react";

// Importing necessary components from Material-UI for the dialog
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
// Importing the deleteUser function from the user service
import { deleteUser } from "@services/userService";

/**
 * Props for the DeleteConfirmationDialog component.
 * @typedef {Object} DeleteConfirmationDialogProps
 * @property {Object} user - The user object containing user details.
 * @property {boolean} openDialog - Indicates whether the dialog is open.
 * @property {function} handleCloseDialog - Function to close the dialog.
 * @property {string} id - ID of the user to be deleted.
 * @property {function} setError - Function to set error state.
 */

/**
 * A dialog component for confirming user account deletion.
 * @param {DeleteConfirmationDialogProps} props - The props for the component.
 * @returns {JSX.Element} The rendered DeleteConfirmationDialog component.
 */
const DeleteConfirmationDialog = ({
  user, // User object containing user details
  openDialog, // Boolean to control dialog visibility
  handleCloseDialog, // Function to close the dialog
  id, // ID of the user to be deleted
  setError, // Function to set error state
}) => {
  // Uncomment this line to use Next.js router for navigation
  // const router = useRouter()

  /**
   * Handles the user deletion process.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  const deleteUserHandler = async () => {
    try {
      // Attempt to delete the user with the provided ID
      await deleteUser(id);
      // Use Next.js router for navigation (if uncommented)
      router.push("/Member");
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
      <DialogTitle id="alert-dialog-title">Confirm Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {user?.first_name} {user?.last_name}&apos;t
          profile? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            // Call the delete user handler and close the dialog
            deleteUserHandler();
            handleCloseDialog();
          }}
          color="error" // Color for the delete button
          autoFocus // Automatically focus this button when the dialog opens
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
