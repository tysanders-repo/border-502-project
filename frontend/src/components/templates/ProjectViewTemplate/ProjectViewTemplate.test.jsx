// ProjectViewTemplate.test.js
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import ProjectViewTemplate from "./ProjectViewTemplate"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import * as projectService from "@services/projectService";
import ProgressLoading from "@components/organisms/ProgressLoading";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@services/projectService", () => ({
  fetchProject: jest.fn(),
}));

jest.mock("@components/organisms/ProgressLoading", () => () => (
  <div>Loading...</div>
));

const mockRouter = {
  push: jest.fn(),
};

beforeEach(() => {
  useRouter.mockReturnValue(mockRouter);
});

describe("ProjectViewTemplate", () => {
  it("renders loading state initially", () => {
    render(<ProjectViewTemplate params={{ id: "1" }} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders project details on successful fetch", async () => {
    const mockProject = {
      title: "Test Project",
      description: "Test Description",
      date: "2023-01-01",
      image_urls: [{ id: "1", url: "http://example.com/image1.jpg" }],
    };

    projectService.fetchProject.mockResolvedValue(mockProject);

    await act(async () => {
      render(<ProjectViewTemplate params={{ id: "1" }} />);
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    expect(screen.getByRole("title")).toBeInTheDocument();
    expect(screen.getByRole("start")).toBeInTheDocument();
    expect(screen.getByRole("description")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    const mockError = new Error("Failed to fetch");
    projectService.fetchProject.mockRejectedValue(mockError);

    await act(async () => {
      render(<ProjectViewTemplate params={{ id: "1" }} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching project: Failed to fetch")
      ).toBeInTheDocument();
    });
  });
});
