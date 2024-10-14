"use client"; // Marks this component for client-side rendering in Next.js

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ProjectDetailsTemplate from "./ProjectDetailsTemplate";
import { fetchProject } from "@services/projectService";
import DeleteProjectDialog from "@components/organisms/DeleteProjectDialog";

// Mock Next.js useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the projectService function
jest.mock("@services/projectService", () => ({
  fetchProject: jest.fn(),
}));

// Mock the DeleteProjectDialog component
jest.mock("@components/organisms/DeleteProjectDialog", () => () => (
  <div>Mocked DeleteProjectDialog</div>
));

describe("ProjectDetailsTemplate", () => {
  const params = { id: "123" };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders loading state initially", () => {
    // Mock the fetchProject function to not resolve immediately
    fetchProject.mockImplementation(() => new Promise(() => {}));

    render(<ProjectDetailsTemplate params={params} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error message on fetch failure", async () => {
    const errorMessage = "Failed to fetch project";
    fetchProject.mockRejectedValue(new Error(errorMessage));

    render(<ProjectDetailsTemplate params={params} />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(`Error fetching project: ${errorMessage}`)
      ).toBeInTheDocument();
    });
  });

  test("renders project details", async () => {
    const mockProject = {
      title: "Test Project",
      description: "This is a test project description.",
      date: "2023-01-01",
      image_urls: [{ url: "http://example.com/image1.jpg" }],
    };

    fetchProject.mockResolvedValue(mockProject);

    render(<ProjectDetailsTemplate params={params} />);

    // Wait for the loading state to finish
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    expect(await screen.findByText(/Start Date:/)).toBeInTheDocument();

    expect(
      await screen.findByText(/This is a test project description/)
    ).toBeInTheDocument();
  });

  test("handles back button navigation", async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    const mockProject = {
      title: "Test Project",
      description: "This is a test project description.",
      date: "2023-01-01",
      image_urls: [{ url: "http://example.com/image1.jpg" }],
    };

    fetchProject.mockResolvedValue(mockProject);

    render(<ProjectDetailsTemplate params={params} />);

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    const backButton = screen.getByRole("button", { name: /back/i });
    backButton.click();

    expect(mockPush).toHaveBeenCalledWith("/Project");
  });

  test("opens delete dialog on delete button click", async () => {
    const mockProject = {
      title: "Test Project",
      description: "This is a test project description.",
      date: "2023-01-01",
      image_urls: [{ url: "http://example.com/image1.jpg" }],
    };

    fetchProject.mockResolvedValue(mockProject);

    render(<ProjectDetailsTemplate params={params} />);

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    deleteButton.click();

    expect(screen.getByText("Mocked DeleteProjectDialog")).toBeInTheDocument();
  });
});
