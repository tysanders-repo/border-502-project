"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser } from "@services/userService";
import MimicTextBox from "@components/atoms/MimicTextBox";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { signedIn, getUserUIN } from "@services/authService";
import UserInfo from "@components/organisms/UserInfo";
import ProgressLoading from "@components/organisms/ProgressLoading";
import UserEditTemplate from "../UserEditTemplate";

function ProfileTemplate({ params }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
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
        const userData = await fetchUser(id);
        setUser(userData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params]);

  // Run final checks after user is set and loading is complete
  useEffect(() => {
    if (!loading && user.first_name === "") {
      finalChecks();
    }
  }, [loading, user]);

  function finalChecks() {
    if (user.first_name === "") {
      router.push(`/Profile`);
    }

    if (user.uin === null) {
      router.push(`/`);
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const profileTab_LoggedOut = (
    <div style={{ display: "flex", gap: "25px", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "row" }}>
        <MimicTextBox text={user.first_name} uppertext={"first name"} />
        <MimicTextBox text={user.last_name} uppertext={"last name"} />
      </div>
      <div style={{ display: "flex", gap: "15px", flexDirection: "row" }}>
        <MimicTextBox text={user.phone} uppertext={"phone"} />
        <MimicTextBox text={user.email} uppertext={"email"} />
      </div>
    </div>
  );

  const projectsTab = <Container>Projects</Container>;

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  return loading ? (
    <ProgressLoading />
  ) : (
    <Box
      sx={{
        width: "90%",
        margin: "50px",
        display: "flex",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile and projects tabs"
          style={{ background: "#f7f7f7" }}
        >
          <Tab label="Profile" />
          <Tab label="Projects" />
        </Tabs>

        <Box>
          {tabValue === 0 ? (
            thisIsMe ? (
              <Box sx={{ display: "flex" }}>
                <Box
                  style={{
                    background: "#f7f7f7",
                    minHeight: "60vh",
                    padding: "20px",
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#085eb3" }}>
                      {user.first_name?.[0]?.toUpperCase() || "?"}
                    </Avatar>
                    <Typography>
                      {`${user.first_name} ${user.last_name}`}
                    </Typography>
                  </Box>
                  {/* badges */}
                  <Typography>Accomplishments:</Typography>
                  {/* join date */}
                  <Typography>
                    Joined: {user.join_date?.split("T")[0].replace(/-/g, "/")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    flexGrow: 1,
                    padding: "40px",
                  }}
                >
                  {isEdit ? (
                    <>
                      <UserEditTemplate params={{ id: user.uin }} />
                    </>
                  ) : (
                    <>
                      <UserInfo user={user} />
                      <Button
                        variant="contained"
                        onClick={() => setIsEdit(true)}
                        sx={{ maxWidth: "200px" }}
                      >
                        Edit Profile
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            ) : (
              profileTab_LoggedOut
            )
          ) : null}
          {tabValue === 1 && projectsTab}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileTemplate;
