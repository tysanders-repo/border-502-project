import { styled } from "@mui/material/styles";

export const SideBySideBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const DeleteBox = styled("div")(({ theme, isDisabled }) => ({
  position: "absolute",
  left: "0px",
  top: "0px",
  zIndex: 10,
  backgroundColor: isDisabled
    ? theme.palette.grey[500]
    : theme.palette.primary.main,
  boxShadow: "0px 0px 10px",
  padding: "8px 10px 8px 8px",
  cursor: "pointer",
}));
