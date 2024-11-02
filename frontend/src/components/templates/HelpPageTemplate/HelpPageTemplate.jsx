"use client";
import React from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledHelpPageTemplate } from "./HelpPageTemplate.styles";

const HelpPageTemplate = (props) => {
  return (
    <StyledHelpPageTemplate>
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url('./homepage1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "100px",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          },
          zIndex: 2,
        }}
      >
        <Box sx={{ position: "relative", zIndex: 3, color: "white" }}>
          <Typography variant="h3" gutterBottom>
            Help & FAQs
          </Typography>
          <Typography variant="h4" gutterBottom>
            General Use
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I become a member?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To apply to become a new member, click the "New Member?" button on the top right of the website in order to be taken to the member application form.
                Submit the form which will be reviewed by organization leaders.
              </Typography>
              <img src="/new_member.gif" alt="New member guide"/>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I sign into my account?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To sign into your account, just press sign in on the top right of the website and you will be redirected to a Google
                sign-in. Use the email that you entered in your application to access your profile and actions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <br></br>
          <Typography variant="h4" gutterBottom>
            Officers
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>As an officer, how do I access the dashboards to manage organizational members and projects?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                After clicking on the profile icon on the right of the navigation bar, the "Members" option will lead to the members
                dashboard while the "Projects" option will lead to the projects dashboard.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </StyledHelpPageTemplate>
  );
};

export default HelpPageTemplate;
