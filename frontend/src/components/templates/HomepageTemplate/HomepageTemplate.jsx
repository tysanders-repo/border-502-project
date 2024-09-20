import React from 'react'
import { Container, Typography } from '@mui/material'

const HomepageTemplate = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h1" gutterBottom>
        Engineering Without Borders
      </Typography>
      <Typography variant="h5" gutterBottom>
        Who We Are
      </Typography>
      <Typography variant="body1">
        Engineers Without Borders-USA (EWB-USA) is a non-profit organization
        that partners with developing communities worldwide in an effort to
        improve their quality of life through sustainable engineering projects.
        By placing an emphasis on sustainability, EWB-USA ensures that its
        projects can be facilitated and maintained by the community well after
        the project is implemented. For more information about EWB-USA, visit:
        <a href="http://ewb-usa.org" target="_blank" rel="noopener noreferrer">
          {' '}
          http://ewb-usa.org
        </a>
        .
      </Typography>
      <br />
      <Typography variant="body1">
        The Engineers Without Borders-USA Texas A&M University Student Chapter
        (EWB-TAMU) is a community of 100+ active students, engineering faculty
        and professional mentors. Of 350 student chapters in the United States,
        EWB-TAMU is among the leaders in number of projects and membership. Our
        members rank among the top engineering students at Texas A&M University
        and have a passion for service. EWB-TAMU members maintain a rigorous
        class schedule while attending weekly officer and project meetings,
        monthly chapter meetings, and various training sessions throughout the
        year. Our mission is to deliver sustainable and innovative solutions to
        real-world problems in order to empower international communities by
        offering opportunities for the students of Texas A&M University to:
      </Typography>
    </Container>
  )
}

export default HomepageTemplate
