"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "40px",
  marginTop: "100px",
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const VeritcalBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));
