"use client";
import React from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HeaderText, ImageBox, DetailsBox } from "./HelpPageTemplate.styles";

const HelpPageTemplate = (props) => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url('./homepage1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        padding: "100px",
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
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          color: "black",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Help & FAQs
        </Typography>
        <Typography variant="h5" gutterBottom>
          General Use
        </Typography>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>How do I become a member?</HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsBox>
              <Typography>
                To apply to become a new member, click the &quot;New
                Member?&quot; button on the top right of the website in order to
                be taken to the member application form. Submit the form which
                will be reviewed by organization leaders.
              </Typography>
              <ImageBox>
                <img
                  src="/new_member.gif"
                  alt="New member guide"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </ImageBox>
            </DetailsBox>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>How do I sign into my account?</HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To sign into your account, just press sign in on the top right of
              the website and you will be redirected to a Google sign-in. Use
              the email that you entered in your application to access your
              profile and actions.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br></br>
        <Typography variant="h5" gutterBottom>
          Officers
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>
              What are the specific actions and views available to each officer?
            </HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>WIP</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>
              As an officer, how do I access the dashboards to manage
              organizational members and projects?
            </HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsBox>
              <Typography>
                After clicking on the profile icon on the right of the
                navigation bar, the &quot;Members&quot; option will lead to the
                members dashboard while the &quot;Projects&quot; option will
                lead to the projects dashboard.
              </Typography>
              <ImageBox>
                <img src="/dashboards.gif" alt="Dashboard guide" />
              </ImageBox>
            </DetailsBox>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>How do I adjust the dues of members?</HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsBox>
              <Typography>
                In the member dashboard, click on the &quot;Manage Dues&quot;
                button and then &quot;Update Dues&quot;. Now you can update the
                due status of active members.
              </Typography>
              <ImageBox>
                <img src="/dues.gif" alt="Update dues guide" />
              </ImageBox>
            </DetailsBox>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>How do I view and manage applications?</HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsBox>
              <Typography>
                In the member dashboard, if you have the permissions, you should
                be able to see a toggle to view applications which will display
                the current member applications. From this display, you can
                accept or deny applications.
              </Typography>
              <ImageBox>
                <img src="/applications.gif" alt="Applications guide" />
              </ImageBox>
            </DetailsBox>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>
              How do I archive, view archived members, and restore archived
              members?
            </HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsBox>
              <Typography>
                In the member dashboard, if you have the permissions, you should
                be able to archive a member in a drop down menu, toggle to view
                archived members, and restore archived members.
              </Typography>
              <ImageBox>
                <img src="/archives.gif" alt="Archives guide" />
              </ImageBox>
            </DetailsBox>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeaderText>
              How do I filter and manage the information displayed for members?
            </HeaderText>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsBox>
              <Typography>
                In the member dashboard, you can adjust the columns that are
                displayed and filter for members with specific details.
              </Typography>
              <ImageBox>
                <img src="/members.gif" alt="Member filter guide" />
              </ImageBox>
            </DetailsBox>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default HelpPageTemplate;
