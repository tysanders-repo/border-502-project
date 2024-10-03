"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation

import {
  CircularProgress,
} from "@mui/material";

function ProfileTemplate({params}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //hardcoded until we can implement authentication
  const id = 0;


  //data fetch
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const json = await fetchUser(id);
        setUserData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);


  if (loading) return <CircularProgress />;
  

  return (
    <>ge</>
  )
}

export default ProfileTemplate;
