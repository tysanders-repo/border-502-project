import React from "react";
import { StyledMimicTextBox } from "./MimicTextBox.styles";
import { Box, Typography } from "@mui/material";

const MimicTextBox = ({ text, uppertext }) => {
  return (
    <>
      <Box
        sx={{
          // mimic the style of the user form
          border: "1px solid rgba(0, 0, 0, 0.23)",
          padding: "8px 14px",
          borderRadius: "4px",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <label
          style={{
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "Roboto,Arial,sans-serif",
            fontSize: "1rem",
            position: "relative",
            zIndex: 1,
            top: -17,
            backgroundColor: "white",
            maxWidth: "calc(133%- 32px)",
          }}
        >
          {uppertext}
        </label>
        <Typography variant="h6">{text}</Typography>
      </Box>
    </>
  );
};

export default MimicTextBox;
