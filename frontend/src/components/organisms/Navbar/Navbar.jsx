"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { signedIn, setUserInfo, getUserRole, deleteUserInfo, getUserUIN } from "@services/authService";
import { signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", link: "/" },
    // Conditionally render "View Members" if role is not "member" and role exists
    userRole && userRole !== "member" && userRole !== "subteam lead" && { text: "View Members", link: "/Member" },
  ].filter(Boolean); // Filter out falsey values

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            href={item.link}
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); 
  // Determines whether to sign in or out
  const handleGoogleSignInAndOut = async () => {
    setIsLoading(true);
    const signedin = await signedIn();
    try {
        if(signedin)
          await deleteUserInfo()
        signedin ? 
        signOut('google') : 
        signIn('google', { redirectTo: "/" });
    } catch (error) {
        console.error('Google error:', error);
    } finally {
        // This doesn't run if the sign in/out is successful since they redirect
    }
  };
  // Sets up user info, if available
  useEffect(() => {
    const setup = async () => {
      const signedin = await signedIn()
      setIsSignedIn(signedin)
      if(signedin){

        const role = await getUserRole()
        const uin = await getUserUIN()
        if(role === undefined || uin === undefined) {
          setUserInfo()
          const role2 = await getUserRole();
          setUserRole(role2);
        }
        else{
          setUserRole(role);
        }
        console.log(role)
        console.log(uin)
      }
    }

    setup()
  }, [])

  return (
    <AppBar
      position="static"
      style={{
        marginBottom: "30px",
        padding: "10px",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" passHref>
            <img src="/logo.png" alt="Logo" style={{ height: "70px" }} />
          </Link>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              {drawer}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  component={Link}
                  href={item.link}
                >
                  {item.text}
                </Button>
              ))}
              {!userRole && (
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  href="/Member/New"
                >
                  New Member?
                </Button>
              )}
              <Button
                    variant="outline"
                    onClick={handleGoogleSignInAndOut}
                    color="inherit"
                    disabled={isLoading}
                  >
                      {isLoading ? "Loading..." : 
                      (isSignedIn ? "Sign out" : "Sign in")
                      }
                  </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
