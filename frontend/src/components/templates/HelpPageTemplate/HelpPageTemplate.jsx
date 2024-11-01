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
            content: "''",
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
          <Typography variant="h4" gutterBottom>
            Help & FAQs
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What is this platform about?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                This platform is designed to help users manage horses and student records efficiently.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I reset my password?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To reset your password, go to the login page and click on "Forgot Password."
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Who can I contact for support?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Please reach out to support@yourplatform.com for any assistance you need.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </StyledHelpPageTemplate>
  );
};

export default HelpPageTemplate;
