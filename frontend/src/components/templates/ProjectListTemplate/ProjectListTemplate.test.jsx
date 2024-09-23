import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProjectListTemplate from './ProjectListTemplate'
import { fetchAllProjects } from 'services/projectService'

jest.mock('services/projectService', () => ({
  fetchAllProjects: jest.fn(),
}))

describe('ProjectListTemplate', () => {
  const projects = [
    {
      id: 1,
      title: 'Project Apollo',
      description: 'A mission to the moon',
      date: '2024-09-25',
    },
    {
      id: 2,
      title: 'Project Artemis',
      description: 'Next lunar mission',
      date: '2025-04-15',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading state initially', () => {
    fetchAllProjects.mockImplementation(() => new Promise(() => {}))

    render(
      <MemoryRouter>
        <ProjectListTemplate />
      </MemoryRouter>
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('renders error state when fetch fails', async () => {
    fetchAllProjects.mockRejectedValueOnce(
      new Error('Failed to fetch projects')
    )

    render(
      <MemoryRouter>
        <ProjectListTemplate />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch projects/i)).toBeInTheDocument()
    })
  })

  test('calls fetchAllProjects and renders project details', async () => {
    fetchAllProjects.mockResolvedValueOnce(projects)

    render(
      <MemoryRouter>
        <ProjectListTemplate />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(fetchAllProjects).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByText(/Project Apollo/i)).toBeInTheDocument()
    expect(screen.getByText(/A mission to the moon/i)).toBeInTheDocument()
    expect(screen.getByText(/Project Artemis/i)).toBeInTheDocument()
  })
})
