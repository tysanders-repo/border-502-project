import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserListTemplate from "./UserListTemplate";
import { fetchAllUsers } from "@services/userService";

jest.mock("@services/userService", () => ({
  fetchAllUsers: jest.fn(),
}));

describe("UserListTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    fetchAllUsers.mockImplementation(() => new Promise(() => {})); // Simulate loading
    render(
      <MemoryRouter>
        <UserListTemplate />
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    fetchAllUsers.mockRejectedValueOnce(new Error("Failed to fetch users"));

    render(
      <MemoryRouter>
        <UserListTemplate />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    });
  });
});
