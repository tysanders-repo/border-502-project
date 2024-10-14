"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser } from "@services/userService";
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
import {
  signedIn,
  getUserUIN,
} from "@services/authService";

function ProfileTemplate({ params }) {
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
  const [thisIsMe, setThisIsMe] = useState(false);
  const router = useRouter();

  // Data fetch
  useEffect(() => {
    if (!signedIn()) {
      console.log("not signed in");
      router.push(`/`);
      return;
    }

    const fetchUserData = async () => {
      try {
        const isCurrentUser = params.id === undefined;
        const id = isCurrentUser ? await getUserUIN() : params.id;
        setThisIsMe(isCurrentUser);
        const json = await fetchUser(id);
        setUser(json);
      } catch (e) {
        setError(e);
      } finally {
        //check if user exists
        finalChecks();
      }
    };

    fetchUserData();
  }, [params]);

  function finalChecks() {
    if (user.first_name === "") {
      router.push(`/Profile`);
    }
    setLoading(false);
  }

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleCancel = async (e) => {
    router.push(`/Profile`);
  };

  const handleSubmit = async (e) => {
    // Handle form submission logic
    return null;
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
    <div style={{display: 'flex', gap: '25px', flexDirection: 'column'}}>
      <div style={{ display: 'flex', gap: '15px', flexDirection: 'row' }}>
        <MimicTextBox text={user.first_name} uppertext={"first name"} />
        <MimicTextBox text={user.last_name} uppertext={"last name"}/>
      </div>
      <div style={{ display: 'flex', gap: '15px', flexDirection: 'row' }}>
        <MimicTextBox text={user.phone} uppertext={"phone"}/>
        <MimicTextBox text={user.email} uppertext={"email"}/>
      </div>
    </div>
  );

  const projectsTab = <Container>Projects</Container>;

  return loading ? (
    <CircularProgress />
  ) : (
    <Box sx={{ flexGrow: 1, padding: '10px' }}>
      <Grid container spacing={5}>
        <Grid item sm={4} xl={2}>
          <Container
            style={{
              background: '#eef',
              minHeight: "800px",
              padding: '16px',
            }}
          >
            <Avatar sx={{ bgcolor: '#085eb3' }}>
              {user.first_name[0]?.toUpperCase()}
            </Avatar>
            {/* badges */}
            {/* join date */}
            Joined: {user.join_date?.split('T')[0].replace(/-/g, '/')}
          </Container>
        </Grid>

        <Grid item sm={8} xl={7}>
          <Container>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile and projects tabs"
              style={{ background: '#eef', marginBottom: '24px' }}
            >
              <Tab label="Profile" />
              <Tab label="Projects" />
            </Tabs>

            <Container px={{ p: '16px' }}>
              {tabValue === 0
                ? thisIsMe
                  ? profileTab_LoggedIn
                  : profileTab_LoggedOut
                : null}
              {tabValue === 1 && projectsTab}
            </Container>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileTemplate;
