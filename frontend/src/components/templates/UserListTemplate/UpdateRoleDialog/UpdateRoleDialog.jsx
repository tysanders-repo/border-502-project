import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material"; // Ensure you import these components if not already

const UpdateRoleDialog = ({
  openRoleDialog,
  handleCloseRoleDialog,
  isMobile,
  selectedRole,
  setSelectedRole,
  UserRoles,
  handleRoleChange,
}) => {
  return (
    <Dialog
      open={openRoleDialog}
      onClose={handleCloseRoleDialog}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: isMobile ? "90%" : "400px", // Wider on desktop, smaller on mobile
          padding: isMobile ? "10px" : "20px", // Adjust padding for mobile
        },
      }}
    >
      <DialogTitle>Update Role</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={UserRoles.find((role) => role.value === selectedRole) || null}
          onChange={(event, newValue) => {
            setSelectedRole(newValue ? newValue.value : null);
          }}
          options={UserRoles}
          getOptionLabel={(option) => option.label || ""}
          renderInput={(params) => (
            <TextField {...params} label="Select Role" />
          )}
          disableClearable
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseRoleDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRoleChange} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateRoleDialog;
