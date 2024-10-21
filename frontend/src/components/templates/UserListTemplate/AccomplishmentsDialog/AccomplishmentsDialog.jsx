import { useState, useEffect } from "react";
import { Dialog, TextField, Button, List, ListItem, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

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
      setAccomplishments(prev => ({
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
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: "20px" }}>
        <h2>Update Accomplishments for {member ? member.first_name : 'Loading...'}</h2>
        <br></br>
        <h3>Accomplishments:</h3> 
        <List>
          {Object.entries(accomplishments).map(([key, value]) => (
            <ListItem key={key} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveAccomplishment(key)}>
                <ClearIcon />
              </IconButton>
            }>
              <strong>{key}:&nbsp;</strong> {value}
            </ListItem>
          ))}
        </List>
        <h3>New Accomplishment:</h3> 
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
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddAccomplishment}>Add Accomplishment</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AccomplishmentsDialog;
