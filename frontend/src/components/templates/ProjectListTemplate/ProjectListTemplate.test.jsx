// src/components/templates/ProjectListTemplate/ProjectListTemplate.test.js

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProjectListTemplate from "./ProjectListTemplate";
import { fetchAllProjects } from "@services/projectService";
import { useRouter } from "next/navigation";

jest.mock("@services/projectService");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@components/organisms/DeleteProjectDialog", () => {
  return ({ project, openDialog, handleCloseDialog }) => (
    <div>
      {openDialog && <div>Delete Project Dialog for {project?.title}</div>}
      <button onClick={handleCloseDialog}>Close</button>
    </div>
  );
});

const mockProjects = [
  {
    id: 1,
    title: "Project Apollo",
    description: "A mission to the moon",
    date: "2024-09-25",
  },
  {
    id: 2,
    title: "Project Artemis",
    description: "Next lunar mission",
    date: "2025-04-15",
  },
];

describe("ProjectListTemplate", () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
  });

  test("renders loading state initially", () => {
    fetchAllProjects.mockImplementation(() => new Promise(() => {}));

    render(<ProjectListTemplate />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error state when fetch fails", async () => {
    fetchAllProjects.mockRejectedValueOnce(new Error("Failed to fetch projects"));

    render(<ProjectListTemplate />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch projects/i)).toBeInTheDocument();
    });
  });

  test("calls fetchAllProjects and renders project details", async () => {
    fetchAllProjects.mockResolvedValueOnce(mockProjects);

    render(<ProjectListTemplate />);

    await waitFor(() => {
      expect(fetchAllProjects).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/Project Apollo/i)).toBeInTheDocument();
    expect(screen.getByText(/A mission to the moon/i)).toBeInTheDocument();
    expect(screen.getByText(/Project Artemis/i)).toBeInTheDocument();
  });


  test("navigates to Users on button click", async () => {
    fetchAllProjects.mockResolvedValueOnce(mockProjects);

    render(<ProjectListTemplate />);

    await waitFor(() => {
      expect(fetchAllProjects).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getByText(/Manage Members/i));

    expect(mockPush).toHaveBeenCalledWith("/Users");
  });

  test("navigates to Add Project on button click", async () => {
    fetchAllProjects.mockResolvedValueOnce(mockProjects);

    render(<ProjectListTemplate />);

    await waitFor(() => {
      expect(fetchAllProjects).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getByText(/Add Project/i));

    expect(mockPush).toHaveBeenCalledWith("/NewProject");
  });
});
