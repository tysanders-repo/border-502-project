import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const BoldHeader = styled(Typography)(() => ({
  fontWeight: "bold",
}));

export const DisplayBox = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2px",
  flexDirection: "column",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "300px",
  },
}));

export const SideBySideBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    gap: "75px",
  },
}));
