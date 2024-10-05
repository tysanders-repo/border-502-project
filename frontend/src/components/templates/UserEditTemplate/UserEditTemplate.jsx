"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@components/organisms/UserForm";
import { Container, Typography } from "@mui/material";
import { fetchUser, updateUser } from "@services/userService";
import { fetchAllDietRestrictions, createDietaryRestriction } from '@services/dietService'; 
import { createMemberDiet, getMemberDiet, deleteMemberDietsByUin, checkMemberDietExists } from '@services/memberDietService'; 

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
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);

  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!id) return; // Don't run the effect if id is not available
    const fetchCurrentUser = async () => {
      try {
        const userData = await fetchUser(id);
        setUser(userData);

        // Fetch all dietary restrictions
        const restrictions = await fetchAllDietRestrictions();
        setDietaryRestrictions(restrictions);

        const currentRestrictions = await getMemberDiet(userData.uin);

        if (currentRestrictions){
          const mappedRestrictions = currentRestrictions.map(restriction => ({
            id: restriction.item_id,
            item_name: restriction.item_name
          }));
          setSelectedDietaryRestrictions(mappedRestrictions); 
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

  const handleCancel = () => {
    router.push(`/Users`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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

        const delResponse = await deleteMemberDietsByUin(response.uin);
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
            const exist_response = await checkMemberDietExists(response.uin, restrictionObject.id);
            console.log('Existence check response:', exist_response);
            
            if (!exist_response){
              await createMemberDiet({ uin: response.uin, item_id: restrictionObject.id}); 
            }
          }
        }
        catch (e){
          setError("failed to add diets");
        }
        console.log(response);
        router.push(`/Users/${response.uin}`);
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

  const validateForm = () => {
    return true;
    // Validation logic can go here
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
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
      />
    </Container>
  );
}

export default UserEditTemplate;
