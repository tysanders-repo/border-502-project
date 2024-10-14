import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import HomepageTemplate from "./HomepageTemplate";
import { fetchAllProjects } from "@services/projectService";

// Mock the fetchAllProjects service
jest.mock("@services/projectService");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("HomepageTemplate", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockImplementation(() => ({ push: mockPush }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    // Simulate fetchAllProjects returning a pending promise
    fetchAllProjects.mockResolvedValueOnce(new Promise(() => {})); // Simulate loading

    render(<HomepageTemplate />);

    // Assert that ProgressLoading is rendered
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders projects when data is fetched successfully", async () => {
    const projectsData = [
      {
        id: 1,
        title: "Project 1",
        description: "Description for project",
        date: "2023-01-01",
        image_urls: [
          { id: "img1", url: "http://example.com/image1.jpg" },
          { id: "img2", url: "http://example.com/image2.jpg" },
        ],
      },
      {
        id: 2,
        title: "Project 2",
        description: "Description for project",
        date: "2023-01-02",
        image_urls: [
          { id: "img3", url: "http://example.com/image3.jpg" },
          { id: "img4", url: "http://example.com/image4.jpg" },
        ],
      },
    ];

    fetchAllProjects.mockResolvedValueOnce(projectsData);

    render(<HomepageTemplate />);

    await waitFor(() => expect(fetchAllProjects).toHaveBeenCalled());

    // Check if project titles are rendered
    expect(screen.getByText(/Project 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Project 2/i)).toBeInTheDocument();
  });

  test("renders error state when fetching projects fails", async () => {
    const errorMessage = "Failed to fetch projects";
    fetchAllProjects.mockRejectedValueOnce(new Error(errorMessage));

    render(<HomepageTemplate />);

    await waitFor(() => expect(fetchAllProjects).toHaveBeenCalled());

    expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
  });

  test("navigates to project detail page when 'View More' button is clicked", async () => {
    const projectsData = [
      {
        id: 1,
        title: "Project 1",
        description: "Description for project",
        date: "2023-01-01",
        image_urls: [],
      },
    ];

    fetchAllProjects.mockResolvedValueOnce(projectsData);

    render(<HomepageTemplate />);

    await waitFor(() => expect(fetchAllProjects).toHaveBeenCalled());

    // Click the "View More" button
    const viewMoreButton = screen.getByRole("button", { name: /View More/i });
    viewMoreButton.click();

    expect(mockPush).toHaveBeenCalledWith("/Project/1/View");
  });
});
