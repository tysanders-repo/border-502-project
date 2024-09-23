import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from './Navbar'

describe('NavBar component', () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter })
  }
  test('renders both links', () => {
    // render the navbar
    renderNavBar()
    // expect the links to be there or something
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('View Members')).toBeInTheDocument()
  })
})
