"use client";

import React from "react";
import { format } from "date-fns";
import { Typography } from "@mui/material";

const UserInfo = ({ user }) => {
  return (
    <div>
      {user.uin && (
        <>
          <Typography variant="h6">
            Name: {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography variant="h6">UIN: {user.uin}</Typography>
          <Typography variant="h6">Major: {user.major}</Typography>
          <Typography variant="h6">Year: {user.year}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">Phone: {user.phone}</Typography>
          <Typography variant="h6">Shirt Size: {user.tshirt_size}</Typography>
          <Typography variant="h6">
            Aggie Ring Day:
            {user.aggie_ring_day === null
              ? "N/A"
              : format(new Date(user.aggie_ring_day), "MMMM d, yyyy")}
          </Typography>
          <Typography variant="h6">
            Birthday:
            {user.birthday === null
              ? "N/A"
              : format(new Date(user.birthday), "MMMM d, yyyy")}
          </Typography>
          <Typography variant="h6">
            Graduation Day:
            {user.graduation_day === null
              ? "N/A"
              : format(new Date(user.graduation_day), "MMMM d, yyyy")}
          </Typography>
          <Typography variant="h6">Position:{user.role}</Typography>
          <Typography variant="h6">
            Paid Dues?{user.paid_dues ? " Yes" : " No"}
          </Typography>
        </>
      )}
    </div>
  );
};

export default UserInfo;
