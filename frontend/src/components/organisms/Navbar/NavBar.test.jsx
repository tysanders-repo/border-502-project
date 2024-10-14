import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar"; // Adjust the import path as necessary
import * as authService from "@services/authService"; // Import the auth service
import { signIn, signOut } from "next-auth/react"; // Import signIn and signOut methods

// Mock the necessary functions from the authService and next-auth
jest.mock("@services/authService", () => ({
  signedIn: jest.fn(),
  setUserInfo: jest.fn(),
  getUserRole: jest.fn(),
  deleteUserInfo: jest.fn(),
  getUserUIN: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test("renders Navbar component", () => {
    render(<Navbar />);

    // Check if the logo is rendered
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  test("displays correct menu items for member role", async () => {
    // Mock the signedIn and getUserRole functions
    authService.signedIn.mockResolvedValue(true);
    authService.getUserRole.mockResolvedValue("member");
    render(<Navbar />);

    // Ensure menu items are rendered correctly
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    // "View Members" should not be displayed for a member
    expect(screen.queryByText(/view members/i)).not.toBeInTheDocument();
  });
});
