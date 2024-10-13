import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteProjectDialog from "./DeleteProjectDialog";
import { deleteProject } from "@services/projectService";
import { useRouter } from "next/navigation";

// Mock the deleteProject function
jest.mock("@services/projectService", () => ({
  deleteProject: jest.fn(),
}));

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("DeleteProjectDialog", () => {
  const mockHandleCloseDialog = jest.fn();
  const mockSetError = jest.fn();
  const project = { title: "My Project" };
  const id = "67890";
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    useRouter.mockReturnValue({ push: mockPush }); // Mock the push function from useRouter
  });

  test("renders dialog with project information", () => {
    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />,
    );

    expect(screen.getByText(/Confirm Delete Project/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Are you sure you want to delete the My Project project\? This action cannot be undone\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Delete Project/i }),
    ).toBeInTheDocument();
  });

  test("calls handleCloseDialog when Cancel button is clicked", () => {
    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });

  test("calls deleteProject and navigates on Delete Project button click", async () => {
    deleteProject.mockResolvedValueOnce(); // Mock the resolved value for deleteProject

    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete Project/i }));

    await waitFor(() => {
      expect(deleteProject).toHaveBeenCalledWith(id); // Check if deleteProject is called with the correct ID
      expect(mockPush).toHaveBeenCalledWith("/Project"); // Check if router.push is called with the correct path
      expect(mockHandleCloseDialog).toHaveBeenCalled(); // Ensure the dialog closes
    });
  });

  test("calls setError when deleteProject fails", async () => {
    const errorMessage = "Error deleting project";
    deleteProject.mockRejectedValueOnce(new Error(errorMessage)); // Mock the rejection

    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete Project/i }));

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(new Error(errorMessage)); // Check if setError is called with the error
      expect(mockHandleCloseDialog).toHaveBeenCalled(); // Ensure the dialog closes
    });
  });
});
