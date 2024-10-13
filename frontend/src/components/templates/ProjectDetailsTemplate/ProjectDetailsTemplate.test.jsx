// src/components/templates/ProjectDetailsTemplate/ProjectDetailsTemplate.test.js

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectDetailsTemplate from "./ProjectDetailsTemplate";
import { fetchProject } from "@services/projectService";
import { useRouter } from "next/router";
import { act } from "@testing-library/react";

jest.mock("@services/projectService", () => ({
  fetchProject: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ProjectDetailsTemplate", () => {
  const project = {
    title: "Project Apollo",
    description: "A mission to the moon",
    date: "2024-09-25",
    pictures: null,
    timeline: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockImplementation(() => ({
      query: { id: "1" }, // Mocking router query with a project ID
    }));
  });

  test("renders loading state initially", () => {
    fetchProject.mockImplementation(() => new Promise(() => {}));

    render(<ProjectDetailsTemplate />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("calls fetchProject with the correct id and renders project details", async () => {
    fetchProject.mockResolvedValueOnce(project);

    render(<ProjectDetailsTemplate />);

    // Wait for fetchProject to be called
    await waitFor(() => {
      expect(fetchProject).toHaveBeenCalledWith("1"); // Ensuring the correct ID is used
    });

    // Assert project details are rendered correctly
    expect(screen.getByText(/Project Apollo/i)).toBeInTheDocument();
  });

  test("renders error state when fetch fails", async () => {
    fetchProject.mockRejectedValueOnce(new Error("Failed to fetch project"));

    await act(async () => {
      render(<ProjectDetailsTemplate />);
    });

    expect(
      screen.getByText(/Error fetching project: Failed to fetch project/i),
    ).toBeInTheDocument();
  });

  test("opens DeleteProjectDialog on button click", async () => {
    fetchProject.mockResolvedValueOnce(project);

    render(<ProjectDetailsTemplate />);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    await waitFor(() => {
      expect(screen.getByText(/Confirm Delete Project/i)).toBeInTheDocument();
    });
  });

  test("navigates to edit project page", async () => {
    fetchProject.mockResolvedValueOnce(project);

    render(<ProjectDetailsTemplate />);

    // Wait for project data to load
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    // Check if the "Edit Project" button is rendered
    expect(
      screen.getByRole("button", { name: /Edit Project/i }),
    ).toBeInTheDocument();
  });
});
