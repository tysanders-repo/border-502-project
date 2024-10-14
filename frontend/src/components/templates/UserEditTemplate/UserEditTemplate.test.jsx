import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/x-date-pickers/AdapterDayjs";
import UserEditTemplate from "./UserEditTemplate";
import * as dietService from "@services/dietService";
import * as interestService from "@services/interestService";
import * as userService from "@services/userService"; // Import userService

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking services
jest.mock("@services/userService");
jest.mock("@services/dietService");
jest.mock("@services/interestService");

// Mock the UserForm component
jest.mock("@components/organisms/UserForm", () => {
  return ({ onSubmit, onChange, user }) => (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={user.first_name}
        onChange={(e) => onChange("first_name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={user.last_name}
        onChange={(e) => onChange("last_name", e.target.value)}
      />
      <button type="submit">Create User</button>
      <button type="button" onClick={() => onChange("first_name", "")}>
        Cancel
      </button>
    </form>
  );
});

describe("UserEditTemplate", () => {
  const params = { id: "123" };

  beforeEach(() => {
    // Mocking the response for the user service
    const mockUser = {
      first_name: "John",
      last_name: "Doe",
    };

    userService.fetchUser.mockResolvedValue(mockUser); // Mock the user fetch method

    // Mocking the response for the other service functions
    dietService.fetchAllDietRestrictions.mockResolvedValue([
      { id: 1, item_name: "Vegetarian" },
      { id: 2, item_name: "Vegan" },
    ]);
    interestService.fetchAllPersonalInterests.mockResolvedValue([
      { id: 1, name: "Traveling" },
      { id: 2, name: "Reading" },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserEditTemplate params={params} />
      </LocalizationProvider>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("First Name")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Last Name")).not.toBeInTheDocument();
  });

  test("renders user data after loading", async () => {
    await act(async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserEditTemplate params={params} />
        </LocalizationProvider>
      );
    });

    // Wait for the loading state to finish
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    // Ensure that the form is now rendered with user data
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("John");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Doe");
  });
});
