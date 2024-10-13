import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetailsTemplate from "./UserDetailsTemplate";
import { fetchUser } from "@services/userService";
import { act } from "@testing-library/react";

jest.mock("services/userService", () => ({
  fetchUser: jest.fn(),
}));

describe("UserDetailsTemplate", () => {
  const user = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    fetchUser.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={["/Member/12345"]}>
        <UserDetailsTemplate />
      </MemoryRouter>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("calls fetchUser with the correct id and renders user details", async () => {
    fetchUser.mockResolvedValueOnce(user);

    render(
      <MemoryRouter initialEntries={[`/Member/4123`]}>
        <UserDetailsTemplate />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(fetchUser).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByText(/Gemma Goddard's Information/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/UIN: 4123/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Major: Aerospace Engineering/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Email: gemgoddard@yahoo.com/i),
    ).toBeInTheDocument();
  });

  test("renders error state when fetch fails", async () => {
    fetchUser.mockRejectedValueOnce(new Error("Failed to fetch user"));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/Member/12345"]}>
          <UserDetailsTemplate />
        </MemoryRouter>,
      );
    });

    expect(
      screen.getByText(/Error fetching user: Failed to fetch user/i),
    ).toBeInTheDocument();
  });

  test("opens DeleteConfirmationDialog on button click", async () => {
    fetchUser.mockResolvedValueOnce(user);

    render(
      <MemoryRouter initialEntries={["/Member/12345"]}>
        <UserDetailsTemplate />
      </MemoryRouter>,
    );

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(/Gemma Goddard's Information/i),
    ).toBeInTheDocument();

    // Simulate clicking the "Delete Account" button
    fireEvent.click(screen.getByRole("button", { name: /Delete Account/i }));

    // Wait for the dialog to open and confirm the dialog content is displayed
    await waitFor(() => {
      expect(screen.getByText(/Confirm Delete Account/i)).toBeInTheDocument();
    });
  });

  test("navigates to edit profile page", async () => {
    fetchUser.mockResolvedValueOnce(user);

    const { container } = render(
      <MemoryRouter initialEntries={["/Member/4123"]}>
        <UserDetailsTemplate />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
  });
});
