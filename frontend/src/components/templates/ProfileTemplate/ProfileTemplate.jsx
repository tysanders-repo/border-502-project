"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@components/organisms/UserForm";
import { fetchUser, updateUser } from "@services/userService";
import {
  CircularProgress,
  Container,
  Grid,
  Box,
  Tabs,
  Tab
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

  const profileTab = (
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

  const projectsTab = (
    <Container>
      Projects
    </Container>
  );


  return (
    loading ? <CircularProgress /> : (
    <Box sx={{ flexGrow: 1, padding: '10px'}}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Container style={{ background: '#eef' }}>
            Profile + Badges
          </Container>
        </Grid>
        <Grid item xs={8}>
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
              {tabValue === 0 && profileTab}
              {tabValue === 1 && projectsTab}
            </Container>
          </Container>
        </Grid>
      </Grid>
    </Box>
  ));
}

export default ProfileTemplate;
