import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectForm from "./ProjectForm"; // Adjust the import path as necessary
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("ProjectForm", () => {
  const mockProject = {
    title: "Test Project",
    description: "Test Description",
    date: new Date().toISOString(),
    images: [],
    image_urls: [],
  };

  const mockSetProject = jest.fn();
  const mockSetRemovedImages = jest.fn();
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());
  const mockHandleCancel = jest.fn();
  const mockHandleImageChange = jest.fn();

  const setup = (props = {}) => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ProjectForm
          project={{ ...mockProject, ...props }}
          setProject={mockSetProject}
          removedImages={[]}
          setRemovedImages={mockSetRemovedImages}
          loading={false}
          error={null}
          formError={{}}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
          handleCancel={mockHandleCancel}
          handleImageChange={mockHandleImageChange}
        />
      </LocalizationProvider>,
    );
  };

  test("renders form fields and buttons", () => {
    setup();

    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload images/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  test("calls onChange when fields change", () => {
    setup();

    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: "New Project Name" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("title", "New Project Name");

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("description", "New Description");
  });

  test("submits form and calls onSubmit", async () => {
    setup();

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
