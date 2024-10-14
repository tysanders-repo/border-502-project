import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer"; // Adjust the import path as needed

describe("Footer", () => {
  test("renders footer component", () => {
    render(<Footer />);

    // Check if the footer is rendered
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument(); // Check if logo image is rendered
    expect(screen.getByText(/contact/i)).toBeInTheDocument(); // Check if "Contact" heading is rendered
    expect(screen.getByText(/email:/i)).toBeInTheDocument(); // Check if "Email:" text is rendered
    expect(screen.getByText(/phone:/i)).toBeInTheDocument(); // Check if "Phone:" text is rendered
    expect(screen.getByText(/navigation/i)).toBeInTheDocument(); // Check if "Navigation" heading is rendered
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument(); // Check if "Home" link is rendered
  });

  test("contains the correct elements and structure", () => {
    const { container } = render(<Footer />);

    // Check if the footer has the correct structure
    expect(container.querySelector("footer")).toBeInTheDocument(); // Assuming <StyledFooter> renders a <footer>
    expect(container.querySelectorAll("div").length).toBe(2); // Check if there are two VeritcalBox components
    expect(container.querySelector("img")).toHaveAttribute("src", "/logo.png"); // Check if logo has correct src
  });
});
