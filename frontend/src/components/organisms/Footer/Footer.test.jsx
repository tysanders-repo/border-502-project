import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer"; // Adjust the import path as needed

describe("Footer", () => {
  test("renders footer component", () => {
    render(<Footer />);

    // Check if the footer is rendered
    expect(screen.getByText(/Contact/i)).toBeInTheDocument(); // Check if "Contact" heading is rendered
  });

});
