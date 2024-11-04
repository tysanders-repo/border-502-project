"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser } from "@services/userService";
import MimicTextBox from "@components/atoms/MimicTextBox";
import {
  Box,
  Tabs,
  Tab,
  Avatar,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { signedIn, getUserUIN, getUserRole } from "@services/authService";
import UserInfo from "@components/organisms/UserInfo";
import ProgressLoading from "@components/organisms/ProgressLoading";
import UserEditTemplate from "../UserEditTemplate";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material";
import AccomplishmentBar from "@components/organisms/AccomplishmentBar";

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
    accomplishments: null,
    interests: null,
    dietary_restrictions: null,
  });
  const [thisIsMe, setThisIsMe] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile-sized

  useEffect(() => {
    if (!isEdit) {
      fetchUserData();
    }
  }, [isEdit]);

  const fetchUserData = async () => {
    setLoading(true);
    const role = await getUserRole();
    if(role === undefined || role === "member" || role === "none"){
      router.push("/");
    }else{
      try {
        const isCurrentUser = params.id === undefined;
        const id = isCurrentUser ? await getUserUIN() : params.id;
        setThisIsMe(isCurrentUser);
        const userData = await fetchUser(id);
        console.log(userData);
        setUser(userData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
  };

  // Data fetch
  useEffect(() => {
    if (!signedIn()) {
      console.log("not signed in");
      router.push(`/`);
      return;
    }

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

  const projectsTab = (
    <Typography>Associated projects to be displayed soon...</Typography>
  );

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  return loading ? (
    <ProgressLoading />
  ) : (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        margin: "50px auto",
        overflow: "scroll",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile and projects tabs"
          style={{ background: "#f7f7f7", padding: "10px" }}
        >
          <Tab label="Profile" />
          <Tab label="Projects" />
        </Tabs>

        <Box>
          {tabValue === 0 ? (
            thisIsMe ? (
              <Box sx={{ display: "flex" }}>
                {!isMobile && <AccomplishmentBar user={user} />}

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
                      <UserEditTemplate
                        params={{ id: user.uin }}
                        isProfile={true}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                      />
                    </>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box sx={{ width: "100%", flexGrow: 1 }}>
                        <UserInfo user={user} />
                      </Box>
                      <IconButton
                        variant="outlined"
                        color="primary"
                        onClick={() => setIsEdit(true)}
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
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
