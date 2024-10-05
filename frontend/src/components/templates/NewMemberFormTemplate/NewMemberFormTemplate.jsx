"use client"; // Ensures this component runs on the client side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { createUser, deleteUser } from "@services/userService"; // Adjust the path to your services
import UserForm from "@components/organisms/UserForm"; // Adjust the path to your components
import { Container, Typography } from "@mui/material";
import { fetchAllDietRestrictions, createDietaryRestriction } from '@services/dietService'; 
import { createMemberDiet, checkMemberDietExists } from '@services/memberDietService'; 

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({ name: false, uin: false });
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);

  useEffect(() => {
    const fetchDietaryRestrictions = async () => {
      try {
        const restrictions = await fetchAllDietRestrictions();
        setDietaryRestrictions(restrictions);
      } catch (error) {
        console.error('Error fetching dietary restrictions:', error);
      }
    };

    fetchDietaryRestrictions();
  }, []);

  const handleDietaryRestrictionChange = async (event, newValue) => { 
    setSelectedDietaryRestrictions(newValue);
  };  

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
      />
    </Container>
  );
}

export default NewMemberFormTemplate;
