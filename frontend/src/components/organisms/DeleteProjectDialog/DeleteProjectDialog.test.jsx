import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteProjectDialog from './DeleteProjectDialog';
import { deleteProject } from 'services/projectService';
import { useNavigate } from 'react-router-dom';

// Mock the deleteProject function
jest.mock('services/projectService', () => ({
  deleteProject: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('DeleteProjectDialog', () => {
  const mockHandleCloseDialog = jest.fn();
  const mockSetError = jest.fn();
  const project = { title: 'My Project' };
  const id = '67890';
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    useNavigate.mockReturnValue(mockNavigate); // Set the mock for useNavigate
  });

  test('renders dialog with project information', () => {
    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    expect(screen.getByText(/Confirm Delete Project/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete the My Project project?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete Project/i })).toBeInTheDocument();
  });

  test('calls handleCloseDialog when Cancel button is clicked', () => {
    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });

  test('calls deleteProject and navigates on Delete Project button click', async () => {
    deleteProject.mockResolvedValueOnce();

    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    await fireEvent.click(screen.getByRole('button', { name: /Delete Project/i }));

    expect(deleteProject).toHaveBeenCalledWith(id);
    expect(mockNavigate).toHaveBeenCalledWith('/projects'); // Check if navigate is called with '/projects'
    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });

  test('calls setError when deleteProject fails', async () => {
    const errorMessage = 'Error deleting project';
    deleteProject.mockRejectedValueOnce(new Error(errorMessage)); // Mock the rejection

    render(
      <DeleteProjectDialog
        project={project}
        openDialog={true}
        handleCloseDialog={mockHandleCloseDialog}
        id={id}
        setError={mockSetError}
      />
    );

    await fireEvent.click(screen.getByRole('button', { name: /Delete Project/i }));

    expect(mockSetError).toHaveBeenCalledWith(new Error(errorMessage));
    expect(mockHandleCloseDialog).toHaveBeenCalled(); // Check if the dialog closes
  });
});
