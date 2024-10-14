import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DeleteProjectDialog from "./DeleteProjectDialog"; // Ensure this import is correct
import { deleteProject } from "@services/projectService";

// Mock the deleteProject function
jest.mock("@services/projectService", () => ({
  deleteProject: jest.fn(),
}));

describe("DeleteProjectDialog", () => {
  const mockProject = { title: "Sample Project" };
  const mockHandleClose = jest.fn();
  const mockSetError = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dialog and displays the project title", () => {
    render(
      <DeleteProjectDialog
        project={mockProject}
        openDialog={true}
        handleCloseDialog={mockHandleClose}
        id="1"
        setError={mockSetError}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument(); // Ensure dialog is rendered
    expect(screen.getByText(/confirm delete project/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to delete the sample project/i)
    ).toBeInTheDocument();
  });

  it("calls handleCloseDialog when Cancel button is clicked", () => {
    render(
      <DeleteProjectDialog
        project={mockProject}
        openDialog={true}
        handleCloseDialog={mockHandleClose}
        id="1"
        setError={mockSetError}
        onDelete={mockOnDelete}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("calls deleteProject and onDelete when Delete button is clicked", async () => {
    // Mock successful deletion
    deleteProject.mockResolvedValueOnce();

    render(
      <DeleteProjectDialog
        project={mockProject}
        openDialog={true}
        handleCloseDialog={mockHandleClose}
        id="1"
        setError={mockSetError}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /delete project/i,
    });

    // Await the click event
    await fireEvent.click(deleteButton);

    // Check if deleteProject is called with the correct ID
    expect(deleteProject).toHaveBeenCalledWith("1");
    // Check if onDelete is called
    expect(mockOnDelete).toHaveBeenCalled();
    // Ensure the dialog is closed
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("sets error when deleteProject fails", async () => {
    const errorMessage = "Failed to delete project";
    deleteProject.mockRejectedValueOnce(new Error(errorMessage)); // Mock deletion failure

    render(
      <DeleteProjectDialog
        project={mockProject}
        openDialog={true}
        handleCloseDialog={mockHandleClose}
        id="1"
        setError={mockSetError}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /delete project/i,
    });
    await fireEvent.click(deleteButton);

    expect(mockSetError).toHaveBeenCalledWith(new Error(errorMessage)); // Check if error state is set
  });
});
