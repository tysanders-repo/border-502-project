"use client";

import React from "react";
import { format } from "date-fns";
import { Typography, Box, Divider } from "@mui/material";
import { BoldHeader, DisplayBox, SideBySideBox } from "./UserInfo.styles";

const UserInfo = ({ user }) => {
  return (
    <div>
      {user.uin && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <BoldHeader variant="h5">Personal Information</BoldHeader>
          <SideBySideBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Name</BoldHeader>
              <Typography variant="subtitle1">
                {`${user.first_name} ${user.last_name}`}
              </Typography>
            </DisplayBox>

            <DisplayBox>
              <BoldHeader variant="subtitle1">UIN</BoldHeader>
              <Typography variant="subtitle1">{user.uin}</Typography>
            </DisplayBox>
          </SideBySideBox>
          <SideBySideBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Email</BoldHeader>
              <Typography variant="subtitle1">{user.email}</Typography>
            </DisplayBox>

            <DisplayBox>
              <BoldHeader variant="subtitle1">Phone</BoldHeader>
              <Typography variant="subtitle1">{user.phone}</Typography>
            </DisplayBox>
          </SideBySideBox>
          <SideBySideBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Class Year</BoldHeader>
              <Typography variant="subtitle1">{user.year}</Typography>
            </DisplayBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Birthday</BoldHeader>
              <Typography variant="subtitle1">
                {user.birthday === null
                  ? "N/A"
                  : format(new Date(user.birthday), "MMMM d, yyyy")}
              </Typography>
            </DisplayBox>
          </SideBySideBox>
          <DisplayBox>
            <BoldHeader variant="subtitle1">Major</BoldHeader>
            <Typography variant="subtitle1">{user.major}</Typography>
          </DisplayBox>
          <Divider sx={{ margin: "15px 0px" }} />
          <BoldHeader variant="h5">Important Dates</BoldHeader>
          <SideBySideBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Aggie Ring Day</BoldHeader>
              <Typography variant="subtitle1">
                {user.aggie_ring_day === null
                  ? "N/A"
                  : format(new Date(user.aggie_ring_day), "MMMM d, yyyy")}
              </Typography>
            </DisplayBox>

            <DisplayBox>
              <BoldHeader variant="subtitle1">Graduation Date</BoldHeader>
              <Typography variant="subtitle1">
                {user.graduation_day === null
                  ? "N/A"
                  : format(new Date(user.graduation_day), "MMMM d, yyyy")}
              </Typography>
            </DisplayBox>
          </SideBySideBox>
          <Divider sx={{ margin: "15px 0px" }} />
          <BoldHeader variant="h5" sx={{ margin: "10px 0px" }}>
            Organization Infromation
          </BoldHeader>
          <SideBySideBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Role</BoldHeader>
              <Typography variant="subtitle1">{user.role}</Typography>
            </DisplayBox>

            <DisplayBox>
              <BoldHeader variant="subtitle1">Dues Stauts</BoldHeader>
              <Typography variant="subtitle1">
                {user.paid_dues ? " Paid" : "Unpaid"}
              </Typography>
            </DisplayBox>
          </SideBySideBox>
          <SideBySideBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Allergies</BoldHeader>
              {user.dietary_restrictions.length > 0 ? (
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                  {user.dietary_restrictions
                    .map((restriction) => restriction.item_name)
                    .join(", ")}
                </Typography>
              ) : (
                <Typography variant="subtitle1">None</Typography>
              )}
            </DisplayBox>

            <DisplayBox>
              <BoldHeader variant="subtitle1">Shirt Size</BoldHeader>
              <Typography variant="subtitle1">{user.tshirt_size}</Typography>
            </DisplayBox>
          </SideBySideBox>

          <Divider sx={{ margin: "15px 0px" }} />

          <BoldHeader variant="h5" sx={{ margin: "10px 0px" }}>
            Interests
          </BoldHeader>

          <SideBySideBox>
            <DisplayBox>
              <BoldHeader variant="subtitle1">Company</BoldHeader>
              {user.interests.company?.length > 0 ? (
                <Typography variant="subtitle1">
                  {user.interests.company
                    .map((interest) => interest.name)
                    .join(", ")}
                </Typography>
              ) : (
                <Typography variant="subtitle1">None</Typography>
              )}
            </DisplayBox>

            <DisplayBox>
              <BoldHeader variant="subtitle1">Career</BoldHeader>
              {user.interests.career?.length > 0 ? (
                <Typography variant="subtitle1">
                  {user.interests.career
                    .map((interest) => interest.name)
                    .join(", ")}
                </Typography>
              ) : (
                <Typography variant="subtitle1">None</Typography>
              )}
            </DisplayBox>
          </SideBySideBox>

          <DisplayBox>
            <BoldHeader variant="subtitle1">Personal</BoldHeader>
            {user.interests.personal?.length > 0 ? (
              <Typography variant="subtitle1">
                {user.interests.personal
                  .map((interest) => interest.name)
                  .join(", ")}
              </Typography>
            ) : (
              <Typography variant="subtitle1">None</Typography>
            )}
          </DisplayBox>
        </Box>
      )}
    </div>
  );
};

export default UserInfo;
