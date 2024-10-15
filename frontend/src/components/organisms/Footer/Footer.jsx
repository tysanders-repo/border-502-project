"use client";
import React from "react";
import { StyledFooter, VeritcalBox } from "./Footer.styles"; // Import styled components for footer layout
import { Typography } from "@mui/material"; // Import Typography from Material-UI for text styling
import Link from "next/link"; // Import Link from Next.js for client-side navigation
// import Image from 'next/image';

/**
 * A functional component that renders the footer of the application.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <StyledFooter>
      <VeritcalBox>
        <Typography>Contact</Typography> {/* Contact section heading */}
        <Typography>Email: </Typography> {/* Email information */}
        <Typography>Phone: </Typography> {/* Phone information */}
      </VeritcalBox>
      <VeritcalBox>
        <Typography>Navigation</Typography> {/* Navigation section heading */}
        <Link href="/">Home</Link> {/* Link to the home page */}
      </VeritcalBox>
      {/* Logo image */}
      <img src="/logo.png" alt="Logo" style={{ height: "70px" }} />{" "}
    </StyledFooter>
  );
};

// Exporting the Footer component for use in other parts of the application
export default Footer;
