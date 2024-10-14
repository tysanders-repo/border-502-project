import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressLoading from "./ProgressLoading"; // Adjust the import path as necessary

describe("ProgressLoading", () => {
  test("renders loading spinner", () => {
    render(<ProgressLoading />);

    // Check if CircularProgress is rendered
    const loadingSpinner = screen.getByRole("progressbar");
    expect(loadingSpinner).toBeInTheDocument();
  });

  test("displays loading spinner in the center of the screen", () => {
    const { container } = render(<ProgressLoading />);

    // Check if the box is styled correctly
    const box = container.firstChild;
    expect(box).toHaveStyle("display: flex");
    expect(box).toHaveStyle("width: 100%");
    expect(box).toHaveStyle("height: 80vh");
    expect(box).toHaveStyle("justify-content: center");
    expect(box).toHaveStyle("align-items: center");
  });
});
