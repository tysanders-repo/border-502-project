import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const CopySnackbar = ({ snackbarOpen, setSnackbarOpen, copyStatus }) => {
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
      message={copyStatus}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      ContentProps={{
        sx: {
          backgroundColor: copyStatus === "Failed to copy" ? "red" : "green",
          color: "white",
        },
      }}
      action={
        <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default CopySnackbar;
