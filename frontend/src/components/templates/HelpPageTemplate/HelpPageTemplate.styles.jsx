import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: "100%",

  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  textAlign: "left",
  gap: "20px",
  alignItems: "center",
  margin: "0 auto",
}));
