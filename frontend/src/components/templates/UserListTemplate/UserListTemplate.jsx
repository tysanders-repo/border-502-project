"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAllUsers,
  updateUserPresident,
  updateUserDues,
} from "@services/userService";
import DeleteConfirmationDialog from "@components/organisms/DeleteConfirmationDialog";
import { Alert, Typography, IconButton, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArchiveIcon from "@mui/icons-material/Archive";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { getUserRole } from "@services/authService";
import { UserRoles } from "@utils/arrays/roles";
import ProgressLoading from "@components/organisms/ProgressLoading";
import UpdateRoleDialog from "./UpdateRoleDialog";
import UserMenu from "./UserMenu";
import { capitalizeAndReplace } from "@utils/functions";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Switch } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * UserListTemplate component
 *
 * This component allows officers with correct permissions to view and update their information.
 * It allows supports of users based on different fields.
 *
 * @returns {JSX.Element} The rendered user list component.
 */
const UserListTemplate = () => {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState("active");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [updateDues, setUpdateDues] = useState(false);
  const [updatedUsersDues, setUpdatedUsersDues] = useState([]);

  const router = useRouter();

  const handleUpdateDeleteUser = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.uin !== selectedUser.uin)
    );
    window.location.reload();
  };
  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
  };

  const handleRoleChange = async () => {
    if (!selectedRole) return;

    try {
      await updateUserPresident(selectedUser.uin, { role: selectedRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uin === selectedUser.uin ? { ...user, role: selectedRole } : user
        )
      );
      handleCloseRoleDialog();
    } catch (err) {
      setError(err);
    }
  };

  const handleDuesSubmit = async () => {
    if (updatedUsersDues.length > 0) {
      setLoading(true);
      try {
        await Promise.all(
          updatedUsersDues.map((user) =>
            updateUserDues(user.uin, user.paid_dues)
          )
        );
        setUpdatedUsersDues([]); // Clear the updates after successful submission
        setUpdateDues(false);
      } catch (error) {
        console.error("Error updating dues:", error);
        alert("Failed to update dues. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setUpdateDues(false);
    }
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    uin: false,
    first_name: true,
    last_name: true,
    role: true,
    major: true,
    year: true,
    email: true,
    phone: true,
    tshirt_size: false,
    paid_dues: true,
    join_date: false,
    aggie_ring_day: false,
    birthday: false,
    graduation_day: false,
    accepted: false,
  });

  // Adjusting display params when changing screen sizes
  useEffect(() => {
    if (isMobile) {
      setColumnVisibilityModel({
        uin: false,
        first_name: true,
        last_name: true,
        role: false,
        major: false,
        year: false,
        email: false,
        phone: false,
        tshirt_size: false,
        paid_dues: false,
        join_date: false,
        aggie_ring_day: false,
        birthday: false,
        graduation_day: false,
        accepted: false,
      });
    } else {
      setColumnVisibilityModel({
        uin: false,
        first_name: true,
        last_name: true,
        role: true,
        major: true,
        year: true,
        email: true,
        phone: true,
        tshirt_size: false,
        paid_dues: true,
        join_date: false,
        aggie_ring_day: false,
        birthday: false,
        graduation_day: false,
        accepted: false,
      });
    }
  }, [isMobile]);

  // Adjusting display params when changing views
  useEffect(() => {
    if (filter === "archived") {
      setColumnVisibilityModel({
        uin: false,
        first_name: true,
        last_name: true,
        role: true,
        major: true,
        year: true,
        email: false,
        phone: false,
        tshirt_size: false,
        paid_dues: false,
        join_date: false,
        aggie_ring_day: false,
        birthday: false,
        graduation_day: false,
        accepted: false,
      });
    } else {
      setColumnVisibilityModel({
        uin: false,
        first_name: true,
        last_name: true,
        role: true,
        major: true,
        year: true,
        email: true,
        phone: true,
        tshirt_size: false,
        paid_dues: true,
        join_date: false,
        aggie_ring_day: false,
        birthday: false,
        graduation_day: false,
        accepted: false,
      });
    }
  }, [filter]);

  const columns = [
    { field: "uin", headerName: "UIN", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      valueGetter: (params) => capitalizeAndReplace(params),
    },
    { field: "major", headerName: "Major", flex: 2 },
    { field: "year", headerName: "Year", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone Number", flex: 1.5 },
    { field: "tshirt_size", headerName: "Shirt Size", flex: 1, hide: false },
    {
      field: "paid_dues",
      headerName: "Dues Paid",
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <>
          {updateDues ? (
            <Switch
              checked={params.row.paid_dues} // Set the checked state based on the user's dues status
              onChange={(event) => {
                const newValue = event.target.checked; // Get the new boolean value
                // Update the updated users array
                setUpdatedUsersDues((prevUsers) => {
                  const existingUserIndex = prevUsers.findIndex(
                    (user) => user.uin === params.row.uin
                  );

                  if (existingUserIndex > -1) {
                    // if the user exists, then remove them because set to their original status
                    return prevUsers.filter(
                      (user) => user.uin !== params.row.uin
                    );
                  } else {
                    // If the user is not in the array add them
                    return [
                      ...prevUsers,
                      { ...params.row, paid_dues: newValue },
                    ];
                  }
                });

                // Update the main users array
                setUsers((prevUsers) =>
                  prevUsers.map((user) =>
                    user.uin === params.row.uin
                      ? { ...user, paid_dues: newValue }
                      : user
                  )
                );
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          ) : (
            <div>{params.row.paid_dues ? "Yes" : "No"}</div> // Show Yes or No based on the dues status
          )}
        </>
      ),
    },
    { field: "join_date", headerName: "Join Date", flex: 1 },
    { field: "aggie_ring_day", headerName: "Ring Date", flex: 1 },
    { field: "birthday", headerName: "Birthday", flex: 1 },
    {
      field: "graduation_day",
      headerName: "Graduation Date",
      flex: 1,
    },
    {
      field: "accepted",
      headerName: "Accepted?",
      flex: 1,
      valueGetter: (params) => (params ? "Yes" : "No"),
    },
    {
      field: "actions",
      sortable: false,
      hideable: false,
      headerName: "",
      renderCell: (params) => (
        <UserMenu
          filter={filter}
          userRole={userRole}
          row={params.row}
          handleAccept={handleAccept}
          handleArchive={handleArchive}
          handleDeleteClick={handleDeleteClick}
          handleOpenRoleDialog={() => setOpenRoleDialog(true)}
          handleMenuClick={handleMenuClick}
          handleCloseMenu={handleCloseMenu}
          anchorEl={anchorEl}
          selectedUser={selectedUser}
        />
      ),
    },
  ];

  useEffect(() => {
    setLoading(true); // Start loading state

    // Define functions to load users and role
    async function loadUsers() {
      try {
        const data = await fetchAllUsers();
        console.log(data);
        setUsers(data); // Set the fetched users
      } catch (e) {
        setError(e); // Set the error if fetching users fails
        setLoading(false); // Stop loading on error
      }
    }

    async function loadRole() {
      try {
        const role = await getUserRole();
        setUserRole(role); // Set the fetched user role
      } catch (e) {
        setError(e); // Set the error if fetching the role fails
        setLoading(false); // Stop loading on error
      }
    }

    // Load role and users in parallel
    const fetchData = async () => {
      await Promise.all([loadUsers(), loadRole()]);
      setLoading(false); // Set loading to false after both are completed
    };

    fetchData();
  }, []);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleAccept = async (uin) => {
    try {
      await updateUserPresident(uin, { accepted: true });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uin === uin ? { ...user, accepted: true } : user
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const handleArchive = async (uin, status) => {
    try {
      await updateUserPresident(uin, { archived: status });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uin === uin ? { ...user, archived: status } : user
        )
      );
      window.location.reload();
    } catch (err) {
      setError(err);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "archived") return user.archived === true;
    if (filter === "new_applications") return !user.accepted && !user.archived;
    if (filter === "active") return user.accepted && !user.archived;
    return true;
  });

  if (loading || !userRole) {
    return <ProgressLoading />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "0 auto",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography variant="h4">EWB Members</Typography>
            {userRole && (
              <Typography variant="caption" gutterBottom>
                Current User: {capitalizeAndReplace(userRole)}
              </Typography>
            )}
          </Box>
          <Button
            variant="outlined"
            onClick={() => router.push(`/Project`)}
            startIcon={<ManageAccountsIcon />}
          >
            {isMobile ? "Projects" : "Manage Projects"}
          </Button>
        </Box>

        {/* Filter buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Box sx={{ display: "flex", gap: isMobile ? "0px" : "10px" }}>
            {isMobile ? (
              filter === "active" ? (
                <Button
                  variant="outlined"
                  onClick={() => setFilter("active")}
                  startIcon={<TaskAltIcon />}
                >
                  Active
                </Button>
              ) : (
                <IconButton onClick={() => setFilter("active")}>
                  <TaskAltIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              )
            ) : (
              <Button
                startIcon={<TaskAltIcon />}
                variant={filter === "active" ? "contained" : "outlined"}
                onClick={() => setFilter("active")}
              >
                Active Members
              </Button>
            )}
            {userRole && (
              <>
                {(userRole === "president" ||
                  userRole === "vice president" ||
                  userRole === "internal relations") && (
                  <>
                    {isMobile ? (
                      filter === "new_applications" ? (
                        <Button
                          variant="outlined"
                          onClick={() => setFilter("new_applications")}
                          startIcon={<NotificationsNoneIcon />}
                        >
                          Applications
                        </Button>
                      ) : (
                        <IconButton
                          onClick={() => setFilter("new_applications")}
                        >
                          <NotificationsNoneIcon
                            sx={{ color: theme.palette.primary.main }}
                          />
                        </IconButton>
                      )
                    ) : (
                      <Button
                        startIcon={<NotificationsNoneIcon />}
                        variant={
                          filter === "new_applications"
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => setFilter("new_applications")}
                      >
                        New Applications
                      </Button>
                    )}

                    {isMobile ? (
                      filter === "archived" ? (
                        <Button
                          variant="outlined"
                          onClick={() => setFilter("archived")}
                          startIcon={<ArchiveIcon />}
                        >
                          Archived
                        </Button>
                      ) : (
                        <IconButton
                          variant="outlined"
                          onClick={() => setFilter("archived")}
                        >
                          <ArchiveIcon
                            sx={{ color: theme.palette.primary.main }}
                          />
                        </IconButton>
                      )
                    ) : (
                      <Button
                        startIcon={<ArchiveIcon />}
                        variant={
                          filter === "archived" ? "contained" : "outlined"
                        }
                        onClick={() => setFilter("archived")}
                      >
                        Archived Members
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Button
              variant={updateDues ? "contained" : "outlined"}
              onClick={() =>
                updateDues ? handleDuesSubmit() : setUpdateDues(true)
              }
              startIcon={<AttachMoneyIcon />}
            >
              {updateDues ? "Submit Dues" : "Update Dues"}
            </Button>
            {updateDues && (
              <Button
                variant={"outlined"}
                color="secondary"
                onClick={() => {
                  setUpdateDues(false);
                  setUpdatedUsersDues([]);
                  window.location.reload();
                }}
                startIcon={<ClearIcon />}
              >
                Cancel Update
              </Button>
            )}
          </Box>
        </Box>

        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.uin}
          disableRowSelectionOnClick
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
        />
      </Box>

      <DeleteConfirmationDialog
        user={selectedUser}
        handleUpdateDeleteUser={handleUpdateDeleteUser}
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        id={selectedUser?.uin}
        setError={setError}
      />

      <UpdateRoleDialog
        openRoleDialog={openRoleDialog}
        handleCloseRoleDialog={handleCloseRoleDialog}
        isMobile={false} // Set this based on your responsive logic
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        UserRoles={UserRoles}
        handleRoleChange={handleRoleChange}
      />
    </div>
  );
};

export default UserListTemplate;
