"use client";
// import Image from 'next/image';
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Menu,
  MenuItem,
  ListItemText,
  Button,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  signedIn,
  setUserInfo,
  getUserRole,
  deleteUserInfo,
  getUserUIN,
} from "@services/authService";
import { signIn, signOut } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import HardwareIcon from "@mui/icons-material/Hardware";
import LogoutIcon from "@mui/icons-material/Logout";
/**
 * A functional component that renders the navigation bar.
 * It includes links to different pages and handles user authentication.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer open/close
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const theme = useTheme(); // Access the theme for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile-sized
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Toggles the drawer open/close state.
   * @param {boolean} open - Indicates whether to open or close the drawer.
   * @returns {function} A function to handle the toggle event.
   */
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Menu items based on user role
  const menuItems = [
    { text: "Home", link: "/" },
    userRole &&
      (userRole === "president" ||
        userRole === "vice president" ||
        userRole === "internal relations" ||
        userRole === "project lead" ||
        userRole === "admin") && {
        text: "View Members",
        link: "/Member",
      },
  ].filter(Boolean); // Filter out falsy values

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

  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [isSignedIn, setIsSignedIn] = useState(false); // State to track sign-in status

  /**
   * Handles the Google sign-in and sign-out process.
   * @returns {Promise<void>} A promise that resolves when the sign-in/sign-out is complete.
   */
  const handleGoogleSignInAndOut = async () => {
    setIsLoading(true);
    const signedin = await signedIn();
    try {
      if (signedin) await deleteUserInfo();
      signedin
        ? signOut({ callbackUrl: "/" })
        : signIn("google", { callbackUrl: "/Profile" });
    } catch (error) {
      console.error("Google error:", error);
    } finally {
      // This doesn't run if the sign in/out is successful since they redirect
    }
  };

  // Sets up user info, if available
  useEffect(() => {
    const setup = async () => {
      const signedin = await signedIn();
      setIsSignedIn(signedin);
      if (signedin) {
        const role = await getUserRole();
        const uin = await getUserUIN();
        if (role === undefined || uin === undefined) {
          setUserInfo();
          const role2 = await getUserRole();
          setUserRole(role2);
        } else {
          setUserRole(role);
        }
      }
    };

    setup();
  }, []);

  return (
    <AppBar
      position="static"
      style={{
        padding: "10px",
        borderBottom: "1px solid rgba(255,255,255, 0.5)",
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
            <Box sx={{ paddingTop: "5px" }}>
              <img src="/logo.png" alt="Logo" style={{ height: "70px" }} />
            </Box>
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
                {isLoading ? (
                  <CircularProgress color="white" size={24} />
                ) : isSignedIn ? (
                  ""
                ) : (
                  "Sign in"
                )}
              </Button>

              {userRole && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    sx={{ textTransform: "Capitalize" }}
                    onClick={handleMenuOpen}
                  >
                    <Avatar
                      sx={{ border: "1px solid white", bgcolor: "transparent" }}
                    >
                      <PersonIcon sx={{ color: theme.palette.common.white }} />
                    </Avatar>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        router.push("/");
                      }}
                    >
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <HomeIcon />
                        <Typography> Home</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        router.push("/Project");
                      }}
                    >
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <HardwareIcon />
                        <Typography> Projects</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        router.push("/Member");
                      }}
                    >
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <PersonIcon />
                        <Typography>Members</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        {
                          handleMenuClose(), handleGoogleSignInAndOut();
                        }
                      }}
                    >
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <LogoutIcon />
                        <Typography>Sign Out</Typography>
                      </Box>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
