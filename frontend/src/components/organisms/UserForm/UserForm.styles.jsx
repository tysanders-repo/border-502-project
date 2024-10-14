import { styled } from "@mui/material/styles"; // Import the styled utility from MUI

/**
 * SideBySideBox Component
 * A responsive flex container that switches between a column layout on smaller screens
 * and a row layout on medium and larger screens.
 */
export const SideBySideBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

/**
 * CaptionBox Component
 * A container used for aligning child elements vertically (in a column) with a small gap
 * between them. Designed to take full width and align elements to the start of the flex container.

 */
export const CaptionBox = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "flex-start",
}));
