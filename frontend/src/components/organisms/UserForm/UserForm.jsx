import React from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { SideBySideBox, CaptionBox } from "./UserForm.styles"; // Custom styled components
import { Majors } from "@utils/arrays/majors"; // Array of possible majors
import { ShirtSizes } from "@utils/arrays/shirts"; // Array of possible shirt sizes
import dayjs from "dayjs"; // Utility for date parsing and formatting
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // MUI DatePicker component

/**
 * UserForm Component
 * Renders a form to collect user details, handle form validation errors, and handle submit/cancel actions.
 *
 * @param {Object} props
 * @param {Object} props.user - The current state of the user form fields.
 * @param {boolean} props.loading - A flag to indicate if the form submission is in progress.
 * @param {Object} props.error - An error object to display submission errors.
 * @param {Object} props.formError - An object that holds validation errors for each field.
 * @param {Function} props.onChange - Callback to update form fields when the user interacts with them.
 * @param {Function} props.onSubmit - Callback to handle form submission.
 * @param {Function} props.handleCancel - Callback to handle form cancellation.
 * @param {Array} props.dietaryRestrictions - Array of dietary restriction options.
 * @param {Function} props.handleDietaryRestrictionChange - Callback to handle changes in dietary restrictions.
 * @param {Array} props.selectedDietaryRestrictions - The current selected dietary restrictions.
 * @param {Array} props.personalInterests - Array of personal interest options.
 * @param {Function} props.handlePersonalInterestRestrictionChange - Callback to handle changes in personal interests.
 * @param {Array} props.selectedPersonalInterests - The current selected personal interests.
 * @param {Array} props.careerInterests - Array of career interest options.
 * @param {Function} props.handleCareerInterestRestrictionChange - Callback to handle changes in career interests.
 * @param {Array} props.selectedCareerInterests - The current selected career interests.
 * @param {Array} props.companyInterests - Array of company interest options.
 * @param {Function} props.handleCompanyInterestRestrictionChange - Callback to handle changes in company interests.
 * @param {Array} props.selectedCompanyInterests - The current selected company interests.
 */
const UserForm = ({
  user,
  loading,
  error,
  formError,
  onChange,
  onSubmit,
  handleCancel,
  dietaryRestrictions,
  handleDietaryRestrictionChange,
  selectedDietaryRestrictions,
  personalInterests,
  handlePersonalInterestRestrictionChange,
  selectedPersonalInterests,
  careerInterests,
  handleCareerInterestRestrictionChange,
  selectedCareerInterests,
  companyInterests,
  handleCompanyInterestRestrictionChange,
  selectedCompanyInterests,
}) => {
  return (
    <form onSubmit={onSubmit} role="form">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/* First and Last Name Fields */}
        <SideBySideBox>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={user.first_name || ""}
            onChange={(e) => onChange("first_name", e.target.value)}
            error={formError.first_name}
            helperText={formError.first_name ? "First Name is required" : ""}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={user.last_name || ""}
            onChange={(e) => onChange("last_name", e.target.value)}
            error={formError.last_name}
            helperText={formError.last_name ? "Last Name is required" : ""}
          />
        </SideBySideBox>

        {/* Phone Number and Email Fields */}
        <SideBySideBox>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={user.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            error={formError.phone}
            helperText={formError.phone ? "Valid Phone Number is required" : ""}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={user.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            error={formError.email}
            helperText={formError.email ? "Valid Email is required" : ""}
          />
        </SideBySideBox>

        {/* Major Field (AutoComplete) */}
        <Autocomplete
          freeSolo
          options={Majors}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.value
          }
          value={user.major || ""}
          onChange={(e, newValue) => onChange("major", newValue?.value || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={formError.major ? "Major is required" : ""}
              error={formError.major}
              label="Major"
            />
          )}
        />

        {/* UIN and Graduation Year Fields */}
        <SideBySideBox>
          <TextField
            label="UIN"
            variant="outlined"
            fullWidth
            type="number"
            value={user.uin || ""}
            onChange={(e) => onChange("uin", e.target.value)}
            error={formError.uin}
            helperText={formError.uin ? "Valid UIN is required" : ""}
          />
          <TextField
            label="Graduation Year"
            variant="outlined"
            fullWidth
            value={user.year || ""}
            onChange={(e) => onChange("year", e.target.value)}
            error={formError.year}
            helperText={formError.year ? "Graduation Year is required" : ""}
          />
        </SideBySideBox>

        {/* Shirt Size Field (AutoComplete) */}
        <Autocomplete
          freeSolo
          options={ShirtSizes}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.value
          }
          value={user.tshirt_size || ""}
          onChange={(e, newValue) =>
            onChange("tshirt_size", newValue?.value || "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: "100%" }}
              helperText={formError.tshirt_size ? "Shirt Size is required" : ""}
              error={formError.tshirt_size}
              label="Shirt Size"
            />
          )}
        />

        {/* Birthday DatePicker */}
        <DatePicker
          label="Birthday"
          value={user.birthday ? dayjs(user.birthday) : null}
          onChange={(date) => onChange("birthday", date)}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              sx: { width: "100%" },
              error: formError.birthday,
              helperText: formError.birthday ? "Birthday is required" : "",
            },
          }}
        />

        {/* Aggie Ring Day and Graduation Day Fields */}
        <SideBySideBox>
          <CaptionBox>
            <DatePicker
              sx={{ width: "100%" }}
              label="Aggie Ring Day"
              value={user.aggie_ring_day ? dayjs(user.aggie_ring_day) : null}
              onChange={(date) => onChange("aggie_ring_day", date)}
            />
            <Typography
              variant="caption"
              sx={{ marginLeft: "10px", color: "grey" }}
            >
              Leave blank if unknown
            </Typography>
          </CaptionBox>
          <CaptionBox>
            <DatePicker
              sx={{ width: "100%" }}
              label="Graduation Day"
              value={user.graduation_day ? dayjs(user.graduation_day) : null}
              onChange={(date) => onChange("graduation_day", date)}
            />
            <Typography
              variant="caption"
              sx={{ marginLeft: "10px", color: "grey" }}
            >
              Leave blank if unknown
            </Typography>
          </CaptionBox>
        </SideBySideBox>

        {/* Dietary Restrictions (Multi-Select AutoComplete) */}
        <Autocomplete
          freeSolo
          multiple
          value={selectedDietaryRestrictions}
          options={dietaryRestrictions}
          getOptionLabel={(option) => option.item_name || option}
          onChange={handleDietaryRestrictionChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Dietary Restrictions"
              variant="outlined"
            />
          )}
        />

        {/* Personal Interests (Multi-Select AutoComplete) */}
        <Autocomplete
          freeSolo
          multiple
          value={selectedPersonalInterests}
          options={personalInterests}
          getOptionLabel={(option) => option.name || option}
          onChange={handlePersonalInterestRestrictionChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Personal Interests"
              variant="outlined"
            />
          )}
        />

        {/* Career Interests (Multi-Select AutoComplete) */}
        <Autocomplete
          freeSolo
          multiple
          value={selectedCareerInterests}
          options={careerInterests}
          getOptionLabel={(option) => option.name || option}
          onChange={handleCareerInterestRestrictionChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Career Interests"
              variant="outlined"
            />
          )}
        />

        {/* Company Interests (Multi-Select AutoComplete) */}
        <Autocomplete
          freeSolo
          multiple
          value={selectedCompanyInterests}
          options={companyInterests}
          getOptionLabel={(option) => option.name || option}
          onChange={handleCompanyInterestRestrictionChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Company Interests"
              variant="outlined"
            />
          )}
        />

        {/* Form Actions (Cancel and Submit Buttons) */}
        <SideBySideBox sx={{ flexDirection: "column-reverse" }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </SideBySideBox>

        {/* Error Alert */}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </form>
  );
};

export default UserForm;
