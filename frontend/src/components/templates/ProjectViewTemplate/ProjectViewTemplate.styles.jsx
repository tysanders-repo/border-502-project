import { styled } from "@mui/material/styles";

export const BackgroundBox = styled("div")(({ theme, project }) => ({
  position: "relative",
  backgroundImage: project.image_urls?.[0]?.url
    ? `url(${project.image_urls[0].url})`
    : `url("/placeholder.png")`,

  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: "white",
  padding: "30px",
  minHeight: "15vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  },
  [theme.breakpoints.up("md")]: {
    padding: "100px",
  },
}));
