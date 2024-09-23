import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

jest.mock('../../templates/HomePageTemplate', () => {
  return () => <div>Your Matcher for HomePage component here</div>
})

jest.mock('../../templates/UserListTemplate', () => {
  return () => <div>Your Matcher for UserListTemplate component here</div>
})

jest.mock('../../templates/UserDetailsTemplate', () => {
  return () => <div>Your Matcher for UserDetailsTemplate component here</div>
})

jest.mock('../../templates/UserEditTemplate', () => {
  return () => <div>Your Matcher for UserEditTemplate component here</div>
})

jest.mock('../../templates/NewMemberFormTemplate', () => {
  return () => <div>Your Matcher for NewMemberFormTemplate component here</div>
})

jest.mock('../../templates/ProjectListTemplate', () => {
  return () => <div>Your Matcher for ProjectListTemplate component here</div>
})

jest.mock('../../templates/ProjectDetailsTemplate', () => {
  return () => <div>Your Matcher for ProjectDetailsTemplate component here</div>
})

jest.mock('../../templates/ProjectEditTemplate', () => {
  return () => <div>Your Matcher for ProjectEditTemplate component here</div>
})

jest.mock('../../templates/NewProjectFormTemplate', () => {
  return () => <div>Your Matcher for NewProjectFormTemplate component here</div>
})

jest.mock('../../../constants', () => ({
  API_URL: 'http://localhost:3000',
}))

describe('AppRoutes component', () => {
  const renderWithRouter = (ui, { initialEntries = ['/'] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </LocalizationProvider>
      ),
    })
  }
  test('root path renders information about the organization', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/'] })
    const expectedText = 'Your Matcher for HomePage component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('user list path renders user list display', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/users'] })
    const expectedText = 'Your Matcher for UserListTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('user details path renders user information', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/users/1'] })
    const expectedText = 'Your Matcher for UserDetailsTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('user edit path renders user edit form', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/users/1/edit'] })
    const expectedText = 'Your Matcher for UserEditTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('new member path renders new member form', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/new-member'] })
    const expectedText = 'Your Matcher for NewMemberFormTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('project list path renders project list display', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/projects'] })
    const expectedText = 'Your Matcher for ProjectListTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('project details path renders project information', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/projects/1'] })
    const expectedText =
      'Your Matcher for ProjectDetailsTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('project edit path renders project edit form', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/projects/1/edit'] })
    const expectedText = 'Your Matcher for ProjectEditTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
  test('new project path renders new project form', async () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/new-project'] })
    const expectedText =
      'Your Matcher for NewProjectFormTemplate component here'
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})
