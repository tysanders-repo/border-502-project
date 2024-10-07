"use client"; // Ensures this component runs on the client side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { createUser, deleteUser } from "@services/userService"; // Adjust the path to your services
import UserForm from "@components/organisms/UserForm"; // Adjust the path to your components
import { CircularProgress, Container, Typography } from "@mui/material";
import { fetchAllDietRestrictions, createDietaryRestriction } from '@services/dietService'; 
import { createMemberDiet, checkMemberDietExists } from '@services/memberDietService'; 
import { fetchAllCareerInterests, fetchAllCompanyInterests, fetchAllPersonalInterests, createInterest } from "@services/interestService";
import { createMemberInterest, checkMemberInterestExists } from "@services/memberInterestService";

function NewMemberFormTemplate() {
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
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);
  const [personalInterests, setPersonalInterests] = useState([]);
  const [selectedPersonalInterests, setSelectedPersonalInterests] = useState([]);
  const [companyInterests, setCompanyInterests] = useState([]);
  const [selectedCompanyInterests, setSelectedCompanyInterests] = useState([]);
  const [careerInterests, setCareerInterests] = useState([]);
  const [selectedCareerInterests, setSelectedCareerInterests] = useState([]);

  useEffect(() => {
    const fetchDietaryRestrictions = async () => {
      try {
        const restrictions = await fetchAllDietRestrictions();
        setDietaryRestrictions(restrictions);
      } catch (error) {
        console.error('Error fetching dietary restrictions:', error);
      }
    };

    const fetchPersonalInterests = async () => {
      try {
        const interests = await fetchAllPersonalInterests();
        setPersonalInterests(interests);
      } catch (error) {
        console.error('Error fetching personal interests:', error);
      }
    };

    const fetchCareerInterests = async () => {
      try {
        const interests = await fetchAllCareerInterests();
        setCareerInterests(interests);
      } catch (error) {
        console.error('Error fetching career interests:', error);
      }
    };

    const fetchCompanyInterests = async () => {
      try {
        const interests = await fetchAllCompanyInterests();
        setCompanyInterests(interests);
      } catch (error) {
        console.error('Error fetching company interests:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchDietaryRestrictions(), fetchPersonalInterests(), fetchCareerInterests(), fetchCompanyInterests()]);
      setLoading(false);
    };

    fetchData();
  }, []);


  const handleDietaryRestrictionChange = async (event, newValue) => { 
    setSelectedDietaryRestrictions(newValue);
  };  

  const handlePersonalInterestRestrictionChange = async (event, newValue) => {
    setSelectedPersonalInterests(newValue);
  }

  const handleCareerInterestRestrictionChange = async (event, newValue) => {
    setSelectedCareerInterests(newValue);
  }

  const handleCompanyInterestRestrictionChange = async (event, newValue) => {
    setSelectedCompanyInterests(newValue);
  }

  const userData = {
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

  const router = useRouter();

  const handleCancel = async (e) => {
    router.push(`/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (validateForm()) {
      try {
        const newUser = await createUser(userData);

        try{
          for (const restriction of selectedDietaryRestrictions) {
            let restrictionObject;
            if (typeof restriction === 'string') {
              const existingRestriction = dietaryRestrictions.find((restrictions) => 
                restrictions.item_name.toLowerCase() === restriction.toLowerCase()
              );
              if(!existingRestriction){
                restrictionObject = await createDietaryRestriction({ item_name: restriction });
              }
              else{
                restrictionObject = existingRestriction;
              }
            } else {
              restrictionObject = restriction;
            }
            //only create member diet if it doesnt already exist
            const exist_response = await checkMemberDietExists(newUser.uin, restrictionObject.id);
            console.log('Existence check response:', exist_response);
            
            if (!exist_response){
              await createMemberDiet({ uin: newUser.uin, item_id: restrictionObject.id}); 
            }
          }
        }
        catch (e){
          setError("failed to add diets");
        }
        try{
          for (const personalInterest of selectedPersonalInterests) {
            let persInterestObj;
            if (typeof personalInterest === 'string') {
              const existingPersonalInterest = personalInterests.find((persElem) => 
                persElem.name.toLowerCase() === personalInterest.toLowerCase()
              );
              if(!existingPersonalInterest){
                console.log('attempting to create new interest')
                persInterestObj = await createInterest({ interest_type: 'personal', name: personalInterest});
              }
              else{
                persInterestObj = existingPersonalInterest;
              }
            } else {
              persInterestObj = personalInterest;
            }
            const exist_response = await checkMemberInterestExists(newUser.uin, persInterestObj.id);
            console.log('Existence check response:', exist_response);
            
            if (!exist_response){
              await createMemberInterest({ uin: newUser.uin, interest_id: persInterestObj.id}); 
            }
          }
        }
        catch (e){
          setError("failed to add personal interests");
        }
        try{
          for (const careerInterest of selectedCareerInterests) {
            let carInterestObj;
            if (typeof careerInterest === 'string') {
              const existingCareerInterest = careerInterests.find((carElem) => 
                carElem.name.toLowerCase() === careerInterest.toLowerCase()
              );
              if(!existingCareerInterest){
                console.log('attempting to create new interest')
                carInterestObj = await createInterest({ interest_type: 'career', name: careerInterest});
              }
              else{
                carInterestObj = existingCareerInterest;
              }
            } else {
              carInterestObj = careerInterest;
            }
            const exist_response = await checkMemberInterestExists(newUser.uin, carInterestObj.id);
            console.log('Existence check response:', exist_response);
            
            if (!exist_response){
              await createMemberInterest({ uin: newUser.uin, interest_id: carInterestObj.id}); 
            }
          }
        }
        catch (e){
          setError("failed to add career interests");
        }
        try{
          for (const companyInterest of selectedCompanyInterests) {
            let compInterestObj;
            if (typeof companyInterest === 'string') {
              const existingCompanyInterest = companyInterests.find((compElem) => 
                compElem.name.toLowerCase() === companyInterest.toLowerCase()
              );
              if(!existingCompanyInterest){
                console.log('attempting to create new interest')
                compInterestObj = await createInterest({ interest_type: 'company', name: companyInterest});
              }
              else{
                compInterestObj = existingCompanyInterest;
              }
            } else {
              compInterestObj = companyInterest;
            }
            const exist_response = await checkMemberInterestExists(newUser.uin, compInterestObj.id);
            console.log('Existence check response:', exist_response);
            
            if (!exist_response){
              await createMemberInterest({ uin: newUser.uin, interest_id: compInterestObj.id}); 
            }
          }
        }
        catch (e){
          setError("failed to add company interests");
        }
        router.push(`/Users/${newUser.uin}`);
      } catch (e) {
        setError("Failed to submit form")
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const validateForm = () => {
    return true;
    const errors = { name: false, uin: false };
    if (user.name.trim() === "") {
      errors.name = true;
    }
    if (isNaN(user.uin)) {
      errors.uin = true;
    }
    setFormError(errors);
    return !errors.name && !errors.uin;
    //ensure that dietary restrictions are all alphabetical
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        New Member Form
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
        handlePersonalInterestRestrictionChange={handlePersonalInterestRestrictionChange}
        selectedPersonalInterests={selectedPersonalInterests}
        careerInterests={careerInterests}
        handleCareerInterestRestrictionChange={handleCareerInterestRestrictionChange}
        selectedCareerInterests={selectedCareerInterests}
        companyInterests={companyInterests}
        handleCompanyInterestRestrictionChange={handleCompanyInterestRestrictionChange}
        selectedCompanyInterests={selectedCompanyInterests}
      />
    </Container>
  );
}

export default NewMemberFormTemplate;
