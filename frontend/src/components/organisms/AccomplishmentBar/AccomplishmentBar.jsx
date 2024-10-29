import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material";

const AccomplishmentBar = ({ user }) => {
  const theme = useTheme();
  return (
    <Box
      style={{
        background: "#f7f7f7",

        padding: "30px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
            width: 65,
            height: 65,
            border: "2px solid black",
          }}
        >
          {`${user.first_name?.[0]?.toUpperCase() || "?"}${
            user.last_name?.[0]?.toUpperCase() || "?"
          }`}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >{`${user.first_name} ${user.last_name}`}</Typography>
          <Typography>
            Joined: {user.join_date?.split("T")[0].replace(/-/g, "/")}
          </Typography>
        </Box>
      </Box>
      {/* badges */}
      <Box>
        {Object.keys(user.accomplishments).length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
              Accomplishments:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Object.entries(user.accomplishments).map(([key, value]) => (
                <Typography key={key} variant="body1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AccomplishmentBar;
