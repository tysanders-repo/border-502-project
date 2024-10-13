import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import {
  SideBySideBox,
  VisuallyHiddenInput,
  DeleteBox,
} from "./ProjectForm.styles";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import UploadIcon from "@mui/icons-material/Upload";
import { useTheme } from "@emotion/react";

/**
 * ProjectForm Component
 *
 * Renders a form for creating or updating a project, including fields for title,
 * description, start date, and functionality to upload and preview images.
 *
 * @param {Object} props - The props for the ProjectForm component.
 * @param {Object} props.project - The current project object containing fields like title, description, and images.
 * @param {Function} props.setProject - Function to update the project object in state.
 * @param {Array<string>} props.removedImages - Array of image IDs that have been removed and need to be excluded during submission.
 * @param {Function} props.setRemovedImages - Function to update the removed images array.
 * @param {boolean} props.loading - Indicates whether the form is currently submitting/loading.
 * @param {Object} props.error - Error object to display a message if submission fails.
 * @param {Object} props.formError - Object storing form-level errors for individual fields (e.g., title, date).
 * @param {Function} props.onChange - Function to handle input changes in the form fields.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {Function} props.handleCancel - Function to handle the cancel action, typically for resetting or closing the form.
 * @param {Function} props.handleImageChange - Function to handle image file changes for uploading.
 *
 * @returns {JSX.Element} The rendered ProjectForm component.
 */
const ProjectForm = ({
  project,
  setProject,
  removedImages,
  setRemovedImages,
  loading,
  error,
  formError,
  onChange,
  onSubmit,
  handleCancel,
  handleImageChange,
}) => {
  // Local state to hold preview images for display before uploading
  const projectCurrent = project.image_urls; // Contains existing image URLs fetched from the database
  const [projectPreview, setProjectPreview] = useState([]); // Local preview state for newly uploaded images

  const theme = useTheme();

  /**
   * Handles the addition of existing images to the removal list.
   * Toggles the image ID in the `removedImages` array.
   *
   * @param {string} image - The ID of the existing image to be added or removed.
   */
  const handleExistingImageClick = (image) => {
    setRemovedImages(
      (prevRemoved) =>
        prevRemoved.includes(image)
          ? prevRemoved.filter((img) => img !== image) // Remove from the list
          : [...prevRemoved, image] // Add to the list
    );
  };

  /**
   * Handles the click event on an image preview to remove it from the state.
   * Synchronizes the removal of images from both the `projectPreview` and `project.images` arrays.
   *
   * @param {string} image - The URL of the preview image to be removed.
   */
  const handlePreviewImageClick = (image) => {
    const imageIndex = projectPreview.indexOf(image); // Get the index of the clicked image

    setProjectPreview((prevPreview) =>
      prevPreview.filter((_, index) => index !== imageIndex) // Remove the clicked image from the preview
    );

    setProject((prevProject) => ({
      ...prevProject,
      images: prevProject.images.filter((_, index) => index !== imageIndex), // Remove the corresponding file
    }));
  };

  /**
   * Handles the addition of new images.
   * Converts the selected files into URLs for preview and updates the project images state.
   *
   * @param {string} name - The name of the field (e.g., "images").
   * @param {FileList} files - The list of files selected from the input.
   */
  const handleImageListChange = (name, files) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file) // Convert FileList to an array and create URLs
    );
    setProjectPreview((prevList) => [...prevList, ...newImages]); // Update the preview list
    handleImageChange(name, files); // Call the parent function to handle the file changes
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Form container using Material-UI's Box component for layout and spacing */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/* Error display */}
        {error?.message > 0 && <Alert severity="error">{error.message}</Alert>}

        {/* Side-by-side container for project title and start date fields */}
        <SideBySideBox>
          {/* Project title input field */}
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            value={project.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            error={formError.title}
            helperText={formError.title ? "Title is required" : ""}
          />

          {/* Date picker for project start date */}
          <DatePicker
            label="Start Date"
            value={project.date ? dayjs(project.date) : null}
            onChange={(date) => onChange("date", date)}
            sx={{ minWidth: "250px" }}
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                sx: { width: "100%" },
                error: formError.date,
                helperText: formError.date ? "Start Date is required" : "",
              },
            }}
          />
        </SideBySideBox>

        {/* Project description input field */}
        <TextField
          label="Description"
          variant="outlined"
          value={project.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          error={formError.description}
          helperText={formError.description ? "Description is required" : ""}
          fullWidth
          multiline
          rows={5}
        />

        {/* Image preview list */}
        {(projectCurrent.length > 0 || projectPreview.length > 0) && (
          <ImageList
            sx={{ width: "100%", height: "100%" }}
            cols={3}
            rowHeight={175}
          >
            {/* Displaying current images (from the database) */}
            {projectCurrent.map((imageUrl, index) => (
              <ImageListItem key={index}>
                <div
                  key={imageUrl}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Button to add/remove images from removedImages array */}
                  <DeleteBox
                    onClick={() => handleExistingImageClick(imageUrl.id)}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                    >
                      {removedImages.includes(imageUrl.id) ? (
                        <RestoreFromTrashIcon
                          fontSize="16px"
                          sx={{ color: "white" }}
                        />
                      ) : (
                        <DeleteIcon fontSize="16px" sx={{ color: "white" }} />
                      )}
                      <Typography sx={{ color: "white" }} variant="caption">
                        {removedImages.includes(imageUrl.id)
                          ? "Restore"
                          : "Delete"}
                      </Typography>
                    </Box>
                  </DeleteBox>

                  <img
                    src={imageUrl.url}
                    alt="Project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
                      display: "block",
                      opacity: removedImages.includes(imageUrl.id) ? 0.3 : 1,
                    }}
                  />
                </div>
              </ImageListItem>
            ))}

            {/* Displaying the preview of the new image */}
            {projectPreview.map((image, index) => (
              <ImageListItem key={index}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Button to remove images from the preview array */}
                  <DeleteBox onClick={() => handlePreviewImageClick(image)}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                    >
                      <DeleteIcon fontSize="16px" sx={{ color: "white" }} />
                      <Typography sx={{ color: "white" }} variant="caption">
                        Delete
                      </Typography>
                    </Box>
                  </DeleteBox>
                  <img
                    src={image}
                    alt={`preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
                      display: "block",
                    }}
                  />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        )}

        {/* File input for uploading new images */}
        <label htmlFor="images">
          <VisuallyHiddenInput
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageListChange("images", e.target.files)}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
          >
            Upload Images
          </Button>
        </label>

        {/* Form buttons for submission and cancellation */}
        <SideBySideBox>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ flex: 1 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <span>{project?.id ? "Update" : "Create"}</span>
            )}
          </Button>
          <Button
            variant="outlined"
            sx={{ flex: 1, ml: 1 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </SideBySideBox>
      </Box>
    </form>
  );
};

export default ProjectForm;
