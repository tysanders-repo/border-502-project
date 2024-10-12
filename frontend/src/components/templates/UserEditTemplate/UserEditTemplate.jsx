"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@components/organisms/UserForm";
import { Container, Typography } from "@mui/material";
import { fetchUser, updateUser } from "@services/userService";
import { validateUserForm } from "@components/organisms/UserForm/validateUserForm";
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

function UserEditTemplate({ params }) {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({ name: false, uin: false });
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

  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!id) return; // Don't run the effect if id is not available
    const fetchCurrentUser = async () => {
      try {
        const userData = await fetchUser(id);
        setUser(userData);

        // Fetch all options
        const restrictions = await fetchAllDietRestrictions();
        setDietaryRestrictions(restrictions);

        const personalInterests = await fetchAllPersonalInterests();
        setPersonalInterests(personalInterests);

        const careerInterests = await fetchAllCareerInterests();
        setCareerInterests(careerInterests);

        const companyInterests = await fetchAllCompanyInterests();
        setCompanyInterests(companyInterests);

        const currentRestrictions = await getMemberDiet(userData.uin);

        if (currentRestrictions) {
          const mappedRestrictions = currentRestrictions.map((restriction) => ({
            id: restriction.item_id,
            item_name: restriction.item_name,
          }));
          setSelectedDietaryRestrictions(mappedRestrictions);
        }

        const currentPersonalInterests = await getMemberPersonalInterests(
          userData.uin
        );

        if (currentPersonalInterests) {
          const mappedPersonalInterests = currentPersonalInterests.map(
            (interests) => ({
              id: interests.interest_id,
              //do i need the interest type here?
              name: interests.name,
            })
          );
          setSelectedPersonalInterests(mappedPersonalInterests);
        }

        const currentCareerInterests = await getMemberCareerInterests(
          userData.uin
        );

        if (currentCareerInterests) {
          const mappedCareerInterests = currentCareerInterests.map(
            (interests) => ({
              id: interests.interest_id,
              //do i need the interest type here?
              name: interests.name,
            })
          );
          setSelectedCareerInterests(mappedCareerInterests);
        }

        const currentCompanyInterests = await getMemberCompanyInterests(
          userData.uin
        );

        if (currentCompanyInterests) {
          const mappedCompanyInterests = currentCompanyInterests.map(
            (interests) => ({
              id: interests.interest_id,
              //do i need the interest type here?
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

    fetchCurrentUser();
  }, [id]);

  const handleDietaryRestrictionChange = (event, newValue) => {
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
  };

  const handleCancel = () => {
    router.push(`/Member`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUserForm(user, setFormError)) {
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
        const response = await updateUser(id, updatedUser);

        const delRestrictions = await deleteMemberDietsByUin(response.uin);
        const delInterests = await deleteMemberInterestsByUin(response.uin);
        try {
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
            //only create member diet if it doesnt already exist
            const exist_response = await checkMemberDietExists(
              response.uin,
              restrictionObject.id
            );
            console.log("Existence check response:", exist_response);

            if (!exist_response) {
              await createMemberDiet({
                uin: response.uin,
                item_id: restrictionObject.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add diets");
        }
        try {
          for (const personalInterest of selectedPersonalInterests) {
            let persInterestObj;
            if (typeof personalInterest === "string") {
              const existingPersonalInterest = personalInterests.find(
                (persElem) =>
                  persElem.name.toLowerCase() === personalInterest.toLowerCase()
              );
              if (!existingPersonalInterest) {
                console.log("attempting to create new interest");
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
            console.log("interest id: ");
            console.log(persInterestObj.id);
            const exist_response = await checkMemberInterestExists({
              uin: response.uin,
              interest_id: persInterestObj.id,
            });
            console.log("Existence check response:", exist_response);

            if (!exist_response) {
              console.log("attempting to add personal interests");
              const creation_response = await createMemberInterest({
                uin: response.uin,
                interest_id: persInterestObj.id,
              });
              console.log(creation_response);
            }
          }
        } catch (e) {
          console.log("failed to add personal interests");
          setError("failed to add personal interests");
        }
        try {
          for (const careerInterest of selectedCareerInterests) {
            let carInterestObj;
            if (typeof careerInterest === "string") {
              const existingCareerInterest = careerInterests.find(
                (carElem) =>
                  carElem.name.toLowerCase() === careerInterest.toLowerCase()
              );
              if (!existingCareerInterest) {
                console.log("attempting to create new interest");
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
            const exist_response = await checkMemberInterestExists(
              response.uin,
              carInterestObj.id
            );
            console.log("Existence check response:", exist_response);

            if (!exist_response) {
              await createMemberInterest({
                uin: response.uin,
                interest_id: carInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add career interests");
        }
        try {
          for (const companyInterest of selectedCompanyInterests) {
            let compInterestObj;
            if (typeof companyInterest === "string") {
              const existingCompanyInterest = companyInterests.find(
                (compElem) =>
                  compElem.name.toLowerCase() === companyInterest.toLowerCase()
              );
              if (!existingCompanyInterest) {
                console.log("attempting to create new interest");
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
            const exist_response = await checkMemberInterestExists(
              response.uin,
              compInterestObj.id
            );
            console.log("Existence check response:", exist_response);

            if (!exist_response) {
              await createMemberInterest({
                uin: response.uin,
                interest_id: compInterestObj.id,
              });
            }
          }
        } catch (e) {
          setError("failed to add company interests");
        }
        console.log(response);
        router.push(`/Member/${response.uin}`);
      } catch (e) {
        setError(e);
      }
    }
  };

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit User - {user.first_name} {user.last_name}
      </Typography>
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
    </Container>
  );
}

export default UserEditTemplate;
