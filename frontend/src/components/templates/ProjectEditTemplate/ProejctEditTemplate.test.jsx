import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/x-date-pickers/AdapterDayjs";
import ProjectEditTemplate from "./ProjectEditTemplate"; // Update import to ProjectEditTemplate
import * as projectService from "@services/projectService"; // Import projectService

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking services
jest.mock("@services/projectService");

// Mock the ProjectForm component
jest.mock("@components/organisms/ProjectForm", () => {
  return ({ onSubmit, onChange, project }) => (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={project.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={project.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
        <button type="submit">Save Project</button>
        <button type="button" onClick={() => onChange("title", "")}>
          Cancel
        </button>
      </form>

  );
});

describe("ProjectEditTemplate", () => {
  const params = { id: "123" };

  beforeEach(() => {
    // Mocking the response for the project service
    const mockProject = {
      title: "Test Project",
      description: "Test Description",
    };

    projectService.fetchProject.mockResolvedValue(mockProject);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ProjectEditTemplate params={params} />
      </LocalizationProvider>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  // test("renders project data after loading", async () => {
  //   await act(async () => {
  //     render(
  //       <LocalizationProvider dateAdapter={AdapterDayjs}>
  //         <ProjectEditTemplate params={params} />
  //       </LocalizationProvider>
  //     );
  //   });

  //   // Wait for the loading state to finish
  //   await waitFor(() =>
  //     expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
  //   );

  //   // Ensure that the form is now rendered with project data
  //   expect(screen.getByPlaceholderText("Project Title")).toHaveValue(
  //     "Test Project"
  //   );
  //   expect(screen.getByPlaceholderText("Project Description")).toHaveValue(
  //     "Test Description"
  //   );
  // });
});
