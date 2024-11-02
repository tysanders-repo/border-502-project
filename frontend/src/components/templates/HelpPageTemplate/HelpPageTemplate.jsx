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
              <Typography>What are the specific actions and views available to each officer?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                WIP
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>As an officer, how do I access the dashboards to manage organizational members and projects?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                After clicking on the profile icon on the right of the navigation bar, the "Members" option will lead to the members
                dashboard while the "Projects" option will lead to the projects dashboard.
              </Typography>
              <img src="/dashboards.gif" alt="Dashboard guide"/>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I adjust the dues of members?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In the member dashboard, click on the "Manage Dues" button and then "Update Dues". Now you can update the due
                status of active members.
              </Typography>
              <img src="/dues.gif" alt="Update dues guide"/>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I view and manage applications?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In the member dashboard, if you have the permissions, you should be able to see a toggle to view applications which will display the current
                member applications. From this display, you can accept or deny applications.
              </Typography>
              <img src="/applications.gif" alt="Applications guide"/>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I archive, view archived members, and restore archived members?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In the member dashboard, if you have the permissions, you should be able to archive a member in a drop down menu, toggle to view archived members,
                and restore archived members.
              </Typography>
              <img src="/archives.gif" alt="Archives guide"/>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I filter and manage the information displayed for members?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In the member dashboard, you can adjust the columns that are displayed and filter for members with specific details.
              </Typography>
              <img src="/members.gif" alt="Member filter guide"/>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </StyledHelpPageTemplate>
  );
};

export default HelpPageTemplate;
