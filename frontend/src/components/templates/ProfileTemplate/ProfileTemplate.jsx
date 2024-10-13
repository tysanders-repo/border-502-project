"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, updateUser } from "@services/userService";
import UserForm from "@components/organisms/UserForm";
import MimicTextBox from "@components/atoms/MimicTextBox";
import {
  CircularProgress,
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  Avatar,
  Typography,
} from "@mui/material";

function ProfileTemplate({params}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({ name: false, uin: false });
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    uin: null,
    major: "",
    year: null,
    email: "",
    phone: "",
    tshirt_size: "",
    aggie_ring_day: null,
    birthday: null,
    graduation_day: null,
  });

  //hardcoded until we can implement authentication
  const id = 331005076;
  const thisIsMe = true;

  //data fetch
  useEffect(() => {
    // if (!id) return; //having some weird loading errors with this rn
    console.log("fetching user data");
    const fetchUserData = async () => {
      try {
        const json = await fetchUser(id);
        setUser(json);
        console.log(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  }
  
  const handleCancel = async (e) => {
    router.push(`/`);
  }

  const handleSubmit = async (e) => {
    return null;
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  const profileTab_LoggedIn = (
    <UserForm
      user={user}
      loading={loading}
      error={error}
      formError={formError}
      onChange={handleChange}
      onSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );

  const profileTab_LoggedOut = (
    <>
      <div style={{display: 'flex', gap: '15px', flexDirection: 'row'}}>
        <MimicTextBox text={user.first_name}/>
        <MimicTextBox text={user.last_name}/>
      </div>
    </>
  );

  const projectsTab = (
    <Container>
      Projects
    </Container>
  );

  const profileTab = (
    <>
      <Avatar sx={{ bgcolor: '#085eb3' }}>{user.first_name[0].toUpperCase()}</Avatar>
    </>
  );


  return (
    loading ? <CircularProgress /> : (
    <Box sx={{ flexGrow: 1, padding: '10px'}}>
      <Grid container spacing={5}>
        <Grid item sm={4} xl={2}>
          <Container style={{
            background: '#eef',
            minHeight: "800px",
            padding: '16px'
          }}>
            {/* profile image */}
            
            {/* badges */}

            {/* join date */}
            Joined: {user.join_date.split('T')[0].replace(/-/g, '/')}
          </Container>
        </Grid>

        <Grid item sm={8} xl={7}>
          <Container>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile and projects tabs"
              style={{ background: '#eef', marginBottom: '24px'}}
            >
              <Tab label="Profile" />
              <Tab label="Projects" />
            </Tabs>

            <Container px={{p: '16px'}}>
              {tabValue === 0 ? (thisIsMe ? profileTab_LoggedIn : profileTab_LoggedOut) : null}
              {tabValue === 1 && projectsTab}
            </Container>
          </Container>
        </Grid>
      </Grid>
    </Box>
  ));
}

export default ProfileTemplate;
