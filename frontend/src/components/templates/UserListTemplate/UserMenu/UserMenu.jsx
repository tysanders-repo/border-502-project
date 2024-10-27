import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

/**
 * UserActions component
 *
 * Handles the rendering of action buttons (view, edit, archive, delete, etc.) for each user.
 *
 * @param {Object} props - Component props
 * @param {string} props.filter - The current filter state
 * @param {string} props.userRole - The role of the current user
 * @param {Object} props.row - The user data for the current row
 * @param {Function} props.handleAccept - Function to accept user
 * @param {Function} props.handleArchive - Function to archive/unarchive user
 * @param {Function} props.handleDeleteClick - Function to open delete confirmation
 * @param {Function} props.handleOpenRoleDialog - Function to open role update dialog
 * @param {Function} props.handleMenuClick - Function to open menu
 * @param {Function} props.handleCloseMenu - Function to close menu
 * @param {HTMLElement} props.anchorEl - Anchor element for the menu
 * @param {Object} props.selectedUser - The selected user object
 */
const UserMenu = ({
  filter,
  userRole,
  row,
  handleAccept,
  handleArchive,
  handleDeleteClick,
  handleOpenRoleDialog,
  handleOpenAccomplishmentsDialog,
  handleMenuClick,
  handleCloseMenu,
  anchorEl,
  selectedUser,
}) => {
  const router = useRouter();

  return (
    <div>
      {filter === "new_applications" ? (
        <div>
          <IconButton onClick={() => handleAccept(row.uin)}>
            <CheckIcon color="success" />
          </IconButton>
          <IconButton onClick={() => handleArchive(row.uin, true)}>
            <CloseIcon color="error" />
          </IconButton>
        </div>
      ) : (
        <IconButton onClick={(event) => handleMenuClick(event, row)}>
          <MoreVertIcon />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            sx: {
              boxShadow: "0px 2px 4px rgba(150, 150, 150, 0.5)",
            },
          },
        }}
      >
        <MenuItem onClick={() => router.push(`/Member/${selectedUser?.uin}`)}>
          View
        </MenuItem>

        {filter === "archived" &&
          (userRole === "president" ||
            userRole === "internal relations" ||
            userRole === "admin") && (
            <div>
              <MenuItem onClick={() => handleArchive(selectedUser?.uin, false)}>
                Restore
              </MenuItem>
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </div>
          )}

        {filter === "active" && (
          <div>
            {userRole === "president" ||
            userRole === "vice president" ||
            userRole === "admin" ? (
              <div>
                <MenuItem onClick={handleOpenRoleDialog}>Update Role</MenuItem>
                <MenuItem
                  onClick={() => handleOpenAccomplishmentsDialog(selectedUser)}
                >
                  Accomplishments
                </MenuItem>
              </div>
            ) : null}

            {userRole === "president" ||
            userRole === "internal relations" ||
            userRole === "admin" ? (
              <div>
                <MenuItem
                  onClick={() =>
                    router.push(`/Member/${selectedUser?.uin}/Edit`)
                  }
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => handleArchive(selectedUser?.uin, true)}
                >
                  Archive
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
              </div>
            ) : null}
          </div>
        )}
      </Menu>
    </div>
  );
};

export default UserMenu;
