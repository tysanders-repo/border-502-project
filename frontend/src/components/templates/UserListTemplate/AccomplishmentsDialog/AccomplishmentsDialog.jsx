import { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const AccomplishmentsDialog = ({ member, open, onClose, onSubmit }) => {
  const [accomplishments, setAccomplishments] = useState({});
  const [newAccomplishmentKey, setNewAccomplishmentKey] = useState("");
  const [newAccomplishmentValue, setNewAccomplishmentValue] = useState("");

  useEffect(() => {
    if (member) {
      setAccomplishments(member.accomplishments || {});
    }
  }, [member]);

  const handleAddAccomplishment = () => {
    if (newAccomplishmentKey.trim() && newAccomplishmentValue.trim()) {
      setAccomplishments((prev) => ({
        ...prev,
        [newAccomplishmentKey.trim()]: newAccomplishmentValue.trim(),
      }));
      setNewAccomplishmentKey("");
      setNewAccomplishmentValue("");
    }
  };

  const handleRemoveAccomplishment = (key) => {
    const { [key]: _, ...rest } = accomplishments; // Remove the accomplishment
    setAccomplishments(rest);
  };

  const handleSave = () => {
    // Call the onSubmit function passed from the UserList
    onSubmit(accomplishments);
    onClose(); // Close the dialog after saving
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px", // Adjust padding as needed
        },
      }}
    >
      <DialogTitle variant="h3">
        Update Accomplishments for {member ? member.first_name : "Loading..."}
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Accomplishments:
        </Typography>
        <List>
          {Object.entries(accomplishments).map(([key, value]) => (
            <ListItem
              key={key}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleRemoveAccomplishment(key)}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              <Typography variant="body1">
                <strong>{key}:&nbsp;</strong> {value}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" gutterBottom>
          New Accomplishment:
        </Typography>
        <TextField
          value={newAccomplishmentKey}
          onChange={(e) => setNewAccomplishmentKey(e.target.value)}
          label="Name"
          fullWidth
          margin="normal"
        />
        <TextField
          value={newAccomplishmentValue}
          onChange={(e) => setNewAccomplishmentValue(e.target.value)}
          label="Description"
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAccomplishment}
        >
          Add Accomplishment
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccomplishmentsDialog;
