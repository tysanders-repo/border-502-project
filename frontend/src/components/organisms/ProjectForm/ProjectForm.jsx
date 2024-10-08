import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  IconButton,
} from "@mui/material";
import { SideBySideBox, VisuallyHiddenInput } from "./ProjectForm.styles";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadIcon from "@mui/icons-material/Upload";

/**
 * ProjectForm Component
 *
 * This component renders a form for creating or updating a project. It includes fields such as project title,
 * description, and start date, and also provides functionality to upload and preview images.
 *
 * @param {Object} props - The props for the ProjectForm component.
 * @param {Object} props.project - The current project object that contains fields such as title, description, and images.
 * @param {function} props.setProject - Function to update the project object in the state.
 * @param {Array} props.removedImages - Array of images that have been removed and need to be excluded during submission.
 * @param {function} props.setRemovedImages - Function to update the removed images array.
 * @param {boolean} props.loading - Boolean indicating whether the form is currently submitting/loading.
 * @param {Object} props.error - Error object to display an error message if submission fails.
 * @param {Object} props.formError - Object that stores form-level errors for individual fields (e.g., title, date).
 * @param {function} props.onChange - Function to handle input changes in the form fields.
 * @param {function} props.onSubmit - Function to handle form submission.
 * @param {function} props.handleCancel - Function to handle the cancel action, typically for resetting or closing the form.
 * @param {function} props.handleImageChange - Function to handle image file changes for uploading images.
 *
 * @returns {React.Element} - The rendered ProjectForm component.
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

  /**
   * Handles the addition of existing images to the removal list.
   * This function toggles the image ID in the `removedImages` array.
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
   * This function synchronizes the removal of images from both the `projectPreview` and `project.images` arrays.
   *
   * @param {string} image - The URL of the preview image to be removed.
   */
  const handlePreviewImageClick = (image) => {
    // Get the index of the clicked image in the projectPreview array
    const imageIndex = projectPreview.indexOf(image);

    // Remove the clicked image from the projectPreview array
    setProjectPreview((prevPreview) =>
      prevPreview.filter((_, index) => index !== imageIndex)
    );

    // Remove the corresponding file from the project.images array
    setProject((prevProject) => ({
      ...prevProject,
      images: prevProject.images.filter((_, index) => index !== imageIndex),
    }));
  };

  /**
   * Handles the addition of new images.
   * Converts the selected files into URLs for preview purposes and
   * updates the project images state.
   *
   * @param {string} name - The name of the field (e.g., "images").
   * @param {FileList} files - The list of files selected from the input.
   */
  const handleImageListChange = (name, files) => {
    // Convert FileList to an array and create URLs for each image
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setProjectPreview((prevList) => [...prevList, ...newImages]); // Update the preview list with new images
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
            error={formError.date}
            sx={{ minWidth: "250px" }}
            helperText={formError.date ? "Start Date is required" : ""}
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
                  <div
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "0px",
                      zIndex: 10,
                    }}
                  >
                    <IconButton
                      variant="contained"
                      onClick={() => handleExistingImageClick(imageUrl.id)}
                    >
                      {removedImages.includes(imageUrl.id) ? (
                        <AddCircleIcon sx={{ color: "white" }} />
                      ) : (
                        <CancelIcon sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </div>
                  <img
                    src={imageUrl.url}
                    alt="Project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
                      display: "block",
                      opacity: removedImages.includes(imageUrl.id) ? 0.5 : 1,
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
                  <div
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "0px",
                      zIndex: 10,
                    }}
                  >
                    <IconButton
                      variant="contained"
                      onClick={() => handlePreviewImageClick(image)}
                    >
                      {projectPreview.includes(image) ? (
                        <CancelIcon sx={{ color: "white" }} />
                      ) : (
                        <AddCircleIcon sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </div>
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

        {/* Image upload input */}

        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<UploadIcon />}
            sx={{ width: "50%" }}
          >
            Add Pictures
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleImageListChange("images", e.target.files)}
              multiple
            />
          </Button>
        </Box>

        {/* Action buttons for submit and cancel */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ProjectForm;
