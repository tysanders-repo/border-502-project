"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, updateUser } from "@services/userService";
import { createUser } from "@services/userService";
import UserForm from "@components/organisms/UserForm";
import MimicTextBox from "@components/atoms/MimicTextBox";
import dayjs from "dayjs"; // Utility for date parsing and formatting
import { validateUserForm } from "@components/organisms/UserForm/validateUserForm";
import {
  CircularProgress,
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  Avatar,
  Typography,
  Switch
} from "@mui/material";
import {
  signedIn,
  getUserUIN,
  getUserRole
} from "@services/authService";
import {
  fetchAllDietRestrictions,
  createDietaryRestriction,
} from "@services/dietService";
import {
  createMemberDiet,
  getMemberDiet,
  deleteMemberDietsByUin,
  checkMemberDietExists,
} from "@services/memberDietService";
import {
  fetchAllCareerInterests,
  fetchAllCompanyInterests,
  fetchAllPersonalInterests,
  createInterest,
} from "@services/interestService";
import {
  createMemberInterest,
  checkMemberInterestExists,
  getMemberPersonalInterests,
  getMemberCareerInterests,
  getMemberCompanyInterests,
  deleteMemberInterestsByUin,
} from "@services/memberInterestService";

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
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] =
    useState([]);
  const [personalInterests, setPersonalInterests] = useState([]);
  const [selectedPersonalInterests, setSelectedPersonalInterests] = useState(
    []
  );
  const [companyInterests, setCompanyInterests] = useState([]);
  const [selectedCompanyInterests, setSelectedCompanyInterests] = useState([]);
  const [careerInterests, setCareerInterests] = useState([]);
  const [selectedCareerInterests, setSelectedCareerInterests] = useState([]);

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
        

        // Fetch all options for dietary restrictions and interests
        const restrictions = await fetchAllDietRestrictions();
        setDietaryRestrictions(restrictions);

        const personalInterests = await fetchAllPersonalInterests();
        setPersonalInterests(personalInterests);

        const careerInterests = await fetchAllCareerInterests();
        setCareerInterests(careerInterests);

        const companyInterests = await fetchAllCompanyInterests();
        setCompanyInterests(companyInterests);

        // Fetch current dietary restrictions for the user
        const currentRestrictions = await getMemberDiet(userData.uin);
        if (currentRestrictions) {
          const mappedRestrictions = currentRestrictions.map((restriction) => ({
            id: restriction.item_id,
            item_name: restriction.item_name,
          }));
          setSelectedDietaryRestrictions(mappedRestrictions);
        }

        // Fetch current personal interests for the user
        const currentPersonalInterests = await getMemberPersonalInterests(
          userData.uin
        );
        if (currentPersonalInterests) {
          const mappedPersonalInterests = currentPersonalInterests.map(
            (interests) => ({
              id: interests.interest_id,
              name: interests.name,
            })
          );
          setSelectedPersonalInterests(mappedPersonalInterests);
        }

        // Fetch current career interests for the user
        const currentCareerInterests = await getMemberCareerInterests(
          userData.uin
        );
        if (currentCareerInterests) {
          const mappedCareerInterests = currentCareerInterests.map(
            (interests) => ({
              id: interests.interest_id,
              name: interests.name,
            })
          );
          setSelectedCareerInterests(mappedCareerInterests);
        }

        // Fetch current company interests for the user
        const currentCompanyInterests = await getMemberCompanyInterests(
          userData.uin
        );
        if (currentCompanyInterests) {
          const mappedCompanyInterests = currentCompanyInterests.map(
            (interests) => ({
              id: interests.interest_id,
              name: interests.name,
            })
          );
          setSelectedCompanyInterests(mappedCompanyInterests);
        }

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

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleCancel = async (e) => {
    router.push(`/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user.uin; // Declare 'id' here before using it
    if (validateUserForm(user, setFormError)) {
      setLoading(true)
      // Create updated user object
      const updatedUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        uin: user.uin,
        major: user.major,
        year: user.year,
        email: user.email,
        phone: user.phone,
        tshirt_size: user.tshirt_size,
        aggie_ring_day: user.aggie_ring_day,
        birthday: user.birthday,
        graduation_day: user.graduation_day,
      };
      try {
        // Update user data
        const response = await updateUser(id, updatedUser);

        // Delete existing dietary restrictions
        const delRestrictions = await deleteMemberDietsByUin(response.uin);
        const delInterests = await deleteMemberInterestsByUin(response.uin);

        try {
          // Add new dietary restrictions
          for (const restriction of selectedDietaryRestrictions) {
            let restrictionObject;
            if (typeof restriction === "string") {
              const existingRestriction = dietaryRestrictions.find(
                (restrictions) =>
                  restrictions.item_name.toLowerCase() ===
                  restriction.toLowerCase()
              );
              if (!existingRestriction) {
                restrictionObject = await createDietaryRestriction({
                  item_name: restriction,
                });
              } else {
                restrictionObject = existingRestriction;
              }
            } else {
              restrictionObject = restriction;
            }

            // Only create member diet if it doesn't already exist
            const exist_response = await checkMemberDietExists(
              response.uin,
              restrictionObject.id
            );
            if (!exist_response) {
              await createMemberDiet({
                uin: response.uin,
                item_id: restrictionObject.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add diets"); // Set error if dietary restriction addition fails
        }

        try {
          // Add new personal interests
          for (const personalInterest of selectedPersonalInterests) {
            let persInterestObj;
            if (typeof personalInterest === "string") {
              const existingPersonalInterest = personalInterests.find(
                (persElem) =>
                  persElem.name.toLowerCase() === personalInterest.toLowerCase()
              );
              if (!existingPersonalInterest) {
                persInterestObj = await createInterest({
                  interest_type: "personal",
                  name: personalInterest,
                });
              } else {
                persInterestObj = existingPersonalInterest;
              }
            } else {
              persInterestObj = personalInterest;
            }
            const exist_response = await checkMemberInterestExists({
              uin: response.uin,
              interest_id: persInterestObj.id,
            });

            if (!exist_response) {
              const creation_response = await createMemberInterest({
                uin: response.uin,
                interest_id: persInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add personal interests"); // Set error if personal interest addition fails
        }

        try {
          // Add new career interests
          for (const careerInterest of selectedCareerInterests) {
            let carInterestObj;
            if (typeof careerInterest === "string") {
              const existingCareerInterest = careerInterests.find(
                (carElem) =>
                  carElem.name.toLowerCase() === careerInterest.toLowerCase()
              );
              if (!existingCareerInterest) {
                carInterestObj = await createInterest({
                  interest_type: "career",
                  name: careerInterest,
                });
              } else {
                carInterestObj = existingCareerInterest;
              }
            } else {
              carInterestObj = careerInterest;
            }
            const exist_response = await checkMemberInterestExists({
              uin: response.uin,
              interest_id: carInterestObj.id,
            });

            if (!exist_response) {
              const creation_response = await createMemberInterest({
                uin: response.uin,
                interest_id: carInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add career interests"); // Set error if career interest addition fails
        }

        try {
          // Add new company interests
          for (const companyInterest of selectedCompanyInterests) {
            let compInterestObj;
            if (typeof companyInterest === "string") {
              const existingCompanyInterest = companyInterests.find(
                (compElem) =>
                  compElem.name.toLowerCase() === companyInterest.toLowerCase()
              );
              if (!existingCompanyInterest) {
                compInterestObj = await createInterest({
                  interest_type: "company",
                  name: companyInterest,
                });
              } else {
                compInterestObj = existingCompanyInterest;
              }
            } else {
              compInterestObj = companyInterest;
            }
            const exist_response = await checkMemberInterestExists({
              uin: response.uin,
              interest_id: compInterestObj.id,
            });

            if (!exist_response) {
              const creation_response = await createMemberInterest({
                uin: response.uin,
                interest_id: compInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add company interests"); // Set error if company interest addition fails
        }

        // Navigate back to the Member page after successful update
        setUser(updatedUser);
        setLoading(false)
        router.push(`/Profile`);
      } catch (error) {
        console.error("Failed to update user:", error);
        setError("Failed to update user."); // Set error if user update fails
      }
    }
  };
  
  const handleDietaryRestrictionChange = async (event, newValue) => {
    setSelectedDietaryRestrictions(newValue);
  };

  const handlePersonalInterestRestrictionChange = async (event, newValue) => {
    setSelectedPersonalInterests(newValue);
  };

  const handleCareerInterestRestrictionChange = async (event, newValue) => {
    setSelectedCareerInterests(newValue);
  };

  const handleCompanyInterestRestrictionChange = async (event, newValue) => {
    setSelectedCompanyInterests(newValue);
  }

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
    dietaryRestrictions={dietaryRestrictions}
    handleDietaryRestrictionChange={handleDietaryRestrictionChange}
    selectedDietaryRestrictions={selectedDietaryRestrictions}
    personalInterests={personalInterests}
    handlePersonalInterestRestrictionChange={
      handlePersonalInterestRestrictionChange
    }
    selectedPersonalInterests={selectedPersonalInterests}
    careerInterests={careerInterests}
    handleCareerInterestRestrictionChange={
      handleCareerInterestRestrictionChange
    }
    selectedCareerInterests={selectedCareerInterests}
    companyInterests={companyInterests}
    handleCompanyInterestRestrictionChange={
      handleCompanyInterestRestrictionChange
    }
    selectedCompanyInterests={selectedCompanyInterests}
    />
  );

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
    <CircularProgress />
  ) : (
    <Box sx={{ flexGrow: 1, padding: "10px" }}>
      <Grid container spacing={5}>
        <Grid item sm={4} xl={2}>
          <Container
            style={{
              background: "#eef",
              minHeight: "800px",
              padding: "16px",
            }}
          >
            <Avatar sx={{ bgcolor: "#085eb3" }}>
              {user.first_name?.[0]?.toUpperCase() || "?"}
            </Avatar>
            {/* badges */}
            {/* join date */}
            Joined: {user.join_date?.split("T")[0].replace(/-/g, "/")}

          </Container>
        </Grid>

        <Grid item sm={8} xl={7}>
          <Container>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile and projects tabs"
              style={{ background: "#eef", marginBottom: "24px" }}
            >
              <Tab label="Profile" />
              <Tab label="Projects" />
            </Tabs>

            <Container px={{ p: "16px" }}>
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
