"use client";
import React from "react";
import { StyledFooter, VeritcalBox, ContactHelpBox } from "./Footer.styles"; // Import styled components for footer layout
import { Typography, IconButton, Box } from "@mui/material"; // Import Typography from Material-UI for text styling
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // You can choose any icon here
/**
 * A functional component that renders the footer of the application.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <StyledFooter>
      <ContactHelpBox>
        <VeritcalBox>
          <Typography variant="h6">Contact Us</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <IconButton>
              <MailOutlineIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="body1">president@ewb-tamu.org</Typography>
          </Box>
        </VeritcalBox>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton href="/Help" sx={{ color: "white" }}>
            <HelpOutlineIcon />
          </IconButton>
          <Typography variant="h6">Help & FAQ</Typography>
        </Box>
      </ContactHelpBox>

      <VeritcalBox>
        <Typography>Follow Us</Typography> {/* Navigation section heading */}
        <Box>
          <a
            href="https://www.instagram.com/ewbtamu/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <InstagramIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
          <a
            href="https://x.com/i/flow/login?redirect_after_login=%2Fewbtamu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <TwitterIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
          <a
            href="https://www.facebook.com/groups/ewbtamu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <FacebookIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
          <a
            href="https://www.youtube.com/channel/UCQV_s3TIzi3XuD6amswmiLw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <YouTubeIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
        </Box>
      </VeritcalBox>
    </StyledFooter>
  );
};

// Exporting the Footer component for use in other parts of the application
export default Footer;
