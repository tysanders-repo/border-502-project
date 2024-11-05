import { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { StyledMilestoneDialog } from './MilestoneDialog.styles'; 

const MilestoneDialog = ({ project, open, onClose, onSubmit }) => {
  const [milestones, setMilestones] = useState([]);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneDate, setNewMilestoneDate] = useState("");

  useEffect(() => {
    if (project) {
      setMilestones([]);
      const initialMilestones = project.timeline || [];
      setMilestones(initialMilestones);
    }
  }, [project]);

  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim() && newMilestoneDate.trim()) {
      const newMilestone = {
        id: Date.now(),
        title: newMilestoneTitle.trim(),
        date: newMilestoneDate.trim(),
        status: "pending", // Default status
      };

      setMilestones((prev) => {
        const updatedMilestones = [...prev, newMilestone];
        return updatedMilestones;
      });

      // Clear input fields
      setNewMilestoneTitle("");
      setNewMilestoneDate("");
    } else {
      console.log("New milestone inputs are empty."); // Log if inputs are empty
    }
  };

  const handleRemoveMilestone = (id) => {
    setMilestones((prev) => prev.filter(milestone => milestone.id !== id));
  };

  const handleSave = () => {
    onSubmit(milestones); // Submit the milestones array
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px",
        },
      }}
    >
      <DialogTitle variant="h3">
        Update Milestones for {project ? project.title : "Loading..."}  
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Milestones:
        </Typography>
        <StyledMilestoneDialog>
          {milestones.map(({ id, title, date }) => (
            <div key={id} className="milestone-item">
              <Typography variant="body1">
                <strong>{title}</strong>: {date}
              </Typography>
              <IconButton
                onClick={() => handleRemoveMilestone(id)}
                color="error"
                aria-label="delete"
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
        </StyledMilestoneDialog>
        <TextField
          label="Milestone Title"
          value={newMilestoneTitle}
          onChange={(e) => setNewMilestoneTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Milestone Date"
          type="date"
          value={newMilestoneDate}
          onChange={(e) => setNewMilestoneDate(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddMilestone} variant="contained">
          Add Milestone
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MilestoneDialog;
