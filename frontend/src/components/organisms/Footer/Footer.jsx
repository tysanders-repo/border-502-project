"use client";
import React from "react";
import { StyledFooter, VeritcalBox } from "./Footer.styles";
import { Typography } from "@mui/material";
import Link from "next/link";

const Footer = (props) => {
  return (
    <StyledFooter>
      <VeritcalBox>
        <Typography>Contact</Typography>
        <Typography>Email: </Typography>
        <Typography>Phone: </Typography>
      </VeritcalBox>
      <VeritcalBox>
        <Typography>Navigation</Typography>
        <Link href="/">Home</Link>
      </VeritcalBox>
      <img src="/logo.png" alt="Logo" style={{ height: "70px" }} />
    </StyledFooter>
  );
};

export default Footer;
