// UserDetailsTemplate.test.js
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import UserDetailsTemplate from "./UserDetailsTemplate"; // Adjust the import path as necessary
import { fetchUser } from "@services/userService";
import { useRouter } from "next/navigation";
import DeleteConfirmationDialog from "@components/organisms/DeleteConfirmationDialog";
import ProgressLoading from "@components/organisms/ProgressLoading";

// Mocking dependencies
jest.mock("@services/userService", () => ({
  fetchUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@components/organisms/ProgressLoading", () => () => (
  <div>Loading...</div>
));
jest.mock("@components/organisms/DeleteConfirmationDialog", () => () => (
  <div>Delete Confirmation Dialog</div>
));

const mockRouter = {
  push: jest.fn(),
};

beforeEach(() => {
  useRouter.mockReturnValue(mockRouter);
});

describe("UserDetailsTemplate", () => {
  it("renders loading state initially", () => {
    render(<UserDetailsTemplate params={{ id: "1" }} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders user details on successful fetch", async () => {
    const mockUser = {
      first_name: "Gemma",
      last_name: "Goddard",
      uin: 4123,
      major: "Aerospace Engineering",
      year: 2024,
      email: "gemgoddard@yahoo.com",
      phone: "5125968393",
      tshirt_size: "XL",
      aggie_ring_day: "2003-05-25",
      birthday: "2003-05-25",
      graduation_day: "2003-05-25",
    };

    fetchUser.mockResolvedValue(mockUser);

    await act(async () => {
      render(<UserDetailsTemplate params={{ id: "1" }} />);
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Gemma Goddard's Information")).toBeInTheDocument();
    expect(screen.getByText("UIN: 4123")).toBeInTheDocument();
    expect(
      screen.getByText("Major: Aerospace Engineering")
    ).toBeInTheDocument();
    expect(screen.getByText("Year: 2024")).toBeInTheDocument();
    expect(screen.getByText("Email: gemgoddard@yahoo.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: 5125968393")).toBeInTheDocument();
    expect(screen.getByText("Shirt Size: XL")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    const mockError = new Error("Failed to fetch");
    fetchUser.mockRejectedValue(mockError);

    await act(async () => {
      render(<UserDetailsTemplate params={{ id: "1" }} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching user: Failed to fetch")
      ).toBeInTheDocument();
    });
  });

  it("handles navigation on back button click", async () => {
    const mockUser = {
      first_name: "Gemma",
      last_name: "Goddard",
      uin: 4123,
      major: "Aerospace Engineering",
      year: 2024,
      email: "gemgoddard@yahoo.com",
      phone: "5125968393",
      tshirt_size: "XL",
      aggie_ring_day: "2003-05-25",
      birthday: "2003-05-25",
      graduation_day: "2003-05-25",
    };

    fetchUser.mockResolvedValue(mockUser);

    await act(async () => {
      render(<UserDetailsTemplate params={{ id: "1" }} />);
    });

    await waitFor(() => {
      screen.getByText("Gemma Goddard's Information");
    });

    // Simulate back button click
    screen.getByRole("back").click();

    expect(mockRouter.push).toHaveBeenCalledWith("/Member");
  });

  it("opens the delete confirmation dialog", async () => {
    const mockUser = {
      first_name: "Gemma",
      last_name: "Goddard",
      uin: 4123,
      major: "Aerospace Engineering",
      year: 2024,
      email: "gemgoddard@yahoo.com",
      phone: "5125968393",
      tshirt_size: "XL",
      aggie_ring_day: "2003-05-25",
      birthday: "2003-05-25",
      graduation_day: "2003-05-25",
    };

    fetchUser.mockResolvedValue(mockUser);

    await act(async () => {
      render(<UserDetailsTemplate params={{ id: "1" }} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Gemma Goddard's Information")
      ).toBeInTheDocument();
    });

    // Simulate delete button click
    screen.getByRole("button", { name: /delete account/i }).click();

    expect(screen.getByText("Delete Confirmation Dialog")).toBeInTheDocument();
  });
});
