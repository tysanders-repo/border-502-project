import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HomepageTemplate from "./HomepageTemplate";
import { fetchAllProjects } from "@services/projectService";
import { act } from "react";

jest.mock("@services/projectService");

describe("HomepageTemplate", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", async () => {
    fetchAllProjects.mockImplementationOnce(() => new Promise(() => {}));
    render(<HomepageTemplate />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    const errorMessage = "Failed to fetch projects";
    fetchAllProjects.mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      render(<HomepageTemplate />);
    });

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test("renders projects when data is fetched successfully", async () => {
    const mockProjects = [
      {
        id: 1,
        title: "Project A",
        date: "2024-08-31",
        description: "Description for Project A",
      },
      {
        id: 2,
        title: "Project B",
        date: "2024-09-01",
        description: "Description for Project B",
      },
    ];
    fetchAllProjects.mockResolvedValueOnce(mockProjects);

    await act(async () => {
      render(<HomepageTemplate />);
    });

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.startsWith("Project A")),
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.startsWith("Project B")),
      ).toBeInTheDocument();
      expect(screen.getByText("Description for Project A")).toBeInTheDocument();
      expect(screen.getByText("Description for Project B")).toBeInTheDocument();
    });
  });
});
