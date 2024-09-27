import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import NavBar from './Navbar';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NavBar component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    useRouter.mockReturnValue({
      pathname: '/',
      query: {},
      asPath: '/',
    });
  });

  const renderNavBar = () => {
    render(<NavBar />);
  };

  test('renders both links', () => {
    renderNavBar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('View Members')).toBeInTheDocument();
  });
});
