import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const project = {
  title: "",
  description: "",
  date: null,
};

const renderComponent = (props = {}) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ProjectForm {...props} />
    </LocalizationProvider>,
  );
};

describe("ProjectForm", () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());
  const mockHandleCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields correctly", () => {
    renderComponent({
      project,
      loading: false,
      error: null,
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    });

    expect(screen.getByLabelText(/Project Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  test("handles input changes correctly", () => {
    renderComponent({
      project,
      loading: false,
      error: null,
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    });

    const projectData = {
      title: "New Project",
      description: "Project description",
      date: dayjs("2023-09-23"),
    };

    fireEvent.change(screen.getByLabelText(/Project Name/i), {
      target: { value: projectData.title },
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: projectData.description },
    });

    fireEvent.change(screen.getByLabelText(/Start Date/i), {
      target: { value: projectData.date },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith("title", "New Project");
    expect(mockOnChange).toHaveBeenCalledWith(
      "description",
      "Project description",
    );
  });

  test("calls handleCancel when Cancel button is clicked", () => {
    renderComponent({
      project,
      loading: false,
      error: null,
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    });

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockHandleCancel).toHaveBeenCalled();
  });

  test("displays error messages when form errors are present", () => {
    renderComponent({
      project,
      loading: false,
      error: null,
      formError: {
        title: true,
        description: true,
        date: true,
      },
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    });

    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
  });

  test("displays error alert when error prop is present", () => {
    const errorMessage = "An error occurred";
    renderComponent({
      project,
      loading: false,
      error: { message: errorMessage },
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
