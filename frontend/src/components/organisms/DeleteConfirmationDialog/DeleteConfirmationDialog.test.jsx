import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { deleteUser } from "@services/userService";

// Mock the deleteUser function
jest.mock("@services/userService", () => ({
  deleteUser: jest.fn(),
}));

describe("DeleteConfirmationDialog", () => {
  const mockHandleCloseDialog = jest.fn();
  const mockSetError = jest.fn();
  const user = { first_name: "Gemma", last_name: "Goddard" };
  const id = "12345";

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders dialog with user information", () => {
    render(
      <DeleteConfirmationDialog
        user={user}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    expect(screen.getByText(/Confirm Delete Account/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Are you sure you want to delete Gemma Goddard's profile?/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Delete Account/i })
    ).toBeInTheDocument();
  });

  test("calls handleCloseDialog when Cancel button is clicked", () => {
    render(
      <DeleteConfirmationDialog
        user={user}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });

  test("calls deleteUser on Delete Account button click", async () => {
    deleteUser.mockResolvedValueOnce();

    render(
      <DeleteConfirmationDialog
        user={user}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete Account/i }));

    expect(deleteUser).toHaveBeenCalledWith(id);
    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });

  test("calls setError when deleteUser fails", async () => {
    const errorMessage = "Error deleting user";
    deleteUser.mockRejectedValueOnce(new Error(errorMessage)); // Mock the rejection

    render(
      <DeleteConfirmationDialog
        user={user}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    await fireEvent.click(
      screen.getByRole("button", { name: /Delete Account/i })
    );

    expect(mockSetError).toHaveBeenCalledWith(new Error(errorMessage));
    expect(mockHandleCloseDialog).toHaveBeenCalled(); // Check if the dialog closes
  });
});
