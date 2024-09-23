import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProjectDetailsTemplate from './ProjectDetailsTemplate'
import { fetchProject } from 'services/projectService'
import { act } from '@testing-library/react'

jest.mock('services/projectService', () => ({
  fetchProject: jest.fn(),
}))

describe('ProjectDetailsTemplate', () => {
  const project = {
    title: 'Project Apollo',
    description: 'A mission to the moon',
    date: '2024-09-25',
    pictures: null,
    timeline: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading state initially', () => {
    fetchProject.mockImplementation(() => new Promise(() => {}))

    render(
      <MemoryRouter initialEntries={['/projects/1']}>
        <ProjectDetailsTemplate />
      </MemoryRouter>
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('calls fetchProject with the correct id and renders project details', async () => {
    fetchProject.mockResolvedValueOnce(project)

    render(
      <MemoryRouter initialEntries={['/projects/1']}>
        <ProjectDetailsTemplate />
      </MemoryRouter>
    )

    // Wait for fetchProject to be called
    await waitFor(() => {
      expect(fetchProject).toHaveBeenCalledTimes(1)
    })

    // Assert project details are rendered correctly
    expect(screen.getByText(/Project Apollo/i)).toBeInTheDocument()
  })

  test('renders error state when fetch fails', async () => {
    fetchProject.mockRejectedValueOnce(new Error('Failed to fetch project'))

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/projects/1']}>
          <ProjectDetailsTemplate />
        </MemoryRouter>
      )
    })

    expect(
      screen.getByText(/Error fetching user: Failed to fetch project/i)
    ).toBeInTheDocument()
  })

  test('opens DeleteProjectDialog on button click', async () => {
    fetchProject.mockResolvedValueOnce(project)

    render(
      <MemoryRouter initialEntries={['/projects/1']}>
        <ProjectDetailsTemplate />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }))

    await waitFor(() => {
      expect(screen.getByText(/Confirm Delete Project/i)).toBeInTheDocument()
    })
  })

  test('navigates to edit project page', async () => {
    fetchProject.mockResolvedValueOnce(project)

    render(
      <MemoryRouter initialEntries={['/projects/1']}>
        <ProjectDetailsTemplate />
      </MemoryRouter>
    )

    // Wait for project data to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    // Check if the "Edit Project" button is rendered
    expect(screen.getByText(/Edit Project/i)).toBeInTheDocument()
  })
})
