"use client";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * A functional component that displays a loading spinner.
 * This component is typically used while data is being fetched or processed.
 * @returns {JSX.Element} The rendered ProgressLoading component.
 */
const ProgressLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress role="progressbar" />
    </Box>
  );
};

export default ProgressLoading;
