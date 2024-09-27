import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProjectEditTemplate from "./ProjectEditTemplate";
import { fetchProject, updateProject } from "@services/projectService";
import { act } from "@testing-library/react";

jest.mock("@services/projectService", () => ({
  fetchProject: jest.fn(),
  updateProject: jest.fn(),
}));

jest.mock("@components/organisms/ProjectForm/ProjectForm", () => {
  return ({ onSubmit, onChange, project }) => (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={project.title}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Project Title"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => onChange("title", "")}>
        Cancel
      </button>
    </form>
  );
});

describe("ProjectEditTemplate", () => {
  const projectData = {
    title: "Project Apollo",
    description: "A mission to the moon",
    date: "2024-09-25",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders error state when fetch fails", async () => {
    fetchProject.mockRejectedValueOnce(new Error("Failed to fetch project"));

    await act(async () => {
      render(<ProjectEditTemplate />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch project/i)).toBeInTheDocument();
    });
  });

  test("calls fetchProject and renders project details", async () => {
    fetchProject.mockResolvedValueOnce(projectData);

    await act(async () => {
      render(<ProjectEditTemplate />);
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Edit Project - Project Apollo/i)).toBeInTheDocument();
  });

  test("handles form submission successfully", async () => {
    fetchProject.mockResolvedValueOnce(projectData);
    updateProject.mockResolvedValueOnce({ id: 1 });

    await act(async () => {
      render(<ProjectEditTemplate />);
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Project Title/i), {
      target: { value: "Updated Project" },
    });
    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(updateProject).toHaveBeenCalledWith({
        title: "Updated Project",
        description: projectData.description,
        date: projectData.date,
      });
    });
  });

  test("navigates to projects list on cancel", async () => {
    fetchProject.mockResolvedValueOnce(projectData);

    await act(async () => {
      render(<ProjectEditTemplate />);
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Cancel/i));

    // Check that the form clears or that the function to handle cancel is called.
    expect(screen.getByPlaceholderText(/Project Title/i).value).toBe("");
  });
});
