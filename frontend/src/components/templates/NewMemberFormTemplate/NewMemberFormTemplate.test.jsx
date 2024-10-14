import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/x-date-pickers/AdapterDayjs";
import NewMemberFormTemplate from "./NewMemberFormTemplate";
import * as dietService from "@services/dietService";
import * as interestService from "@services/interestService";
import { useRouter } from "next/navigation";

// Mock Next.js useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking services
jest.mock("@services/userService");
jest.mock("@services/dietService");
jest.mock("@services/interestService");

// Mock the UserForm component
jest.mock("@components/organisms/UserForm", () => {
  // eslint-disable-next-line
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

describe("NewMemberFormTemplate", () => {
  let router;

  beforeEach(() => {
    router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    // Mocking the response for the service functions
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
        <NewMemberFormTemplate />
      </LocalizationProvider>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders form elements after loading", async () => {
    await act(async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <NewMemberFormTemplate />
        </LocalizationProvider>
      );
    });

    // Wait for the loading state to finish
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    // Ensure that the form is now rendered
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  });
});
