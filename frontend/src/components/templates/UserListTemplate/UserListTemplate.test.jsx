import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import UserListTemplate from "./UserListTemplate";
import * as userService from "@services/userService";
import { getUserRole } from "@services/authService";

jest.mock("@services/userService", () => ({
  fetchAllUsers: jest.fn(),
  updateUserPresident: jest.fn(),
}));
// eslint-disable-next-line
jest.mock("@components/organisms/DeleteConfirmationDialog", () => () => (
  <div>Delete Confirmation Dialog</div>
));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("@services/authService", () => ({
  getUserRole: jest.fn(),
}));

describe("UserListTemplate", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    userService.fetchAllUsers.mockResolvedValueOnce(new Promise(() => {})); // Simulate pending promise
    render(<UserListTemplate />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders user list when data is fetched", async () => {
    const mockUsers = [
      {
        uin: 1,
        first_name: "John",
        last_name: "Doe",
        role: "member",
        major: "CS",
        year: "2024",
        email: "john@example.com",
        accepted: true,
        archived: false,
      },
      {
        uin: 2,
        first_name: "Jane",
        last_name: "Smith",
        role: "president",
        major: "EE",
        year: "2023",
        email: "jane@example.com",
        accepted: true,
        archived: false,
      },
    ];

    userService.fetchAllUsers.mockResolvedValueOnce(mockUsers);

    // Mocking getUserRole to return a specific role
    getUserRole.mockResolvedValueOnce("president");

    render(<UserListTemplate />);

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
    );

    expect(screen.getByText("Active Members")).toBeInTheDocument();
    expect(screen.getByText("Archived Members")).toBeInTheDocument();
    expect(screen.getByText("New Applications")).toBeInTheDocument();
  });
});
