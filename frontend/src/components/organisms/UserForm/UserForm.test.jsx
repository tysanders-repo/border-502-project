// UserForm.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the Dayjs adapter
import UserForm from "./UserForm";

describe("UserForm", () => {
  const user = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    major: "",
    uin: "",
    year: "",
    tshirt_size: "",
    birthday: null,
    aggie_ring_day: null,
    graduation_day: null,
  };

  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockHandleCancel = jest.fn();
  const dietaryRestrictions = [];
  const personalInterests = [];
  const careerInterests = [];
  const companyInterests = [];
  const selectedDietaryRestrictions = [];
  const selectedPersonalInterests = [];
  const selectedCareerInterests = [];
  const selectedCompanyInterests = [];
  const loading = false;
  const error = null;
  const formError = {};

  beforeEach(() => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserForm
          user={user}
          loading={loading}
          error={error}
          formError={formError}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          handleCancel={mockHandleCancel}
          dietaryRestrictions={dietaryRestrictions}
          selectedDietaryRestrictions={selectedDietaryRestrictions}
          handleDietaryRestrictionChange={jest.fn()}
          personalInterests={personalInterests}
          selectedPersonalInterests={selectedPersonalInterests}
          handlePersonalInterestRestrictionChange={jest.fn()}
          careerInterests={careerInterests}
          selectedCareerInterests={selectedCareerInterests}
          handleCareerInterestRestrictionChange={jest.fn()}
          companyInterests={companyInterests}
          selectedCompanyInterests={selectedCompanyInterests}
          handleCompanyInterestRestrictionChange={jest.fn()}
        />
      </LocalizationProvider>,
    );
  });

  test("renders UserForm and handles input changes", async () => {
    // Check if form fields render correctly
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

    // Simulate input changes
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });

    // Assert that onChange was called with the correct arguments
    expect(mockOnChange).toHaveBeenCalledWith("first_name", "John");
    expect(mockOnChange).toHaveBeenCalledWith("last_name", "Doe");
  });

  test("handles form submission", async () => {
    fireEvent.submit(screen.getByRole("form"));

    // Check if onSubmit was called
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("handles cancel button click", async () => {
    fireEvent.click(screen.getByText(/Cancel/i));

    // Check if handleCancel was called
    expect(mockHandleCancel).toHaveBeenCalled();
  });
});
