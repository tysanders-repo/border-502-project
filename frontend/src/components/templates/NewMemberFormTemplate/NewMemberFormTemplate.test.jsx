import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewMemberFormTemplate from "./NewMemberFormTemplate";
import { createUser } from "@services/userService";

// Mock the createUser function
jest.mock("@services/userService", () => ({
  createUser: jest.fn(),
}));

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form", () => {
    render(<NewMemberFormTemplate />); // No need for MemoryRouter in Next.js

    expect(screen.getByText(/New Member Form/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    createUser.mockResolvedValueOnce({ uin: 12345 });

    render(<NewMemberFormTemplate />); // No need for MemoryRouter in Next.js

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText(/Create User/i));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        first_name: "John",
        last_name: "Doe",
        uin: null,
        major: "",
        year: null,
        email: "",
        phone: "",
        tshirt_size: "",
        aggie_ring_day: null,
        birthday: null,
        graduation_day: null,
      });
    });
  });

  test("handles cancel button click", () => {
    const user = { first_name: "John", last_name: "Doe" };

    render(<NewMemberFormTemplate user={user} />);

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(screen.getByPlaceholderText(/First Name/i).value).toBe("");
  });
});
