import React from "react";
import { useRouter } from "next/router";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteUser } from "@services/userService";

const DeleteConfirmationDialog = ({
  user,
  openDialog,
  handleCloseDialog,
  id,
  setError,
}) => {
  // const router = useRouter()

  const deleteUserHandler = async () => {
    try {
      await deleteUser(id);
      // Use Next.js router for navigation
      router.push("/Member");
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
      <DialogTitle id="alert-dialog-title">Confirm Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {user?.first_name} {user?.last_name}'s
          profile? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            deleteUserHandler();
            handleCloseDialog();
          }}
          color="error"
          autoFocus
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
