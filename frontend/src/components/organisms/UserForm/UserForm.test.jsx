import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import UserForm from './UserForm'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import daysjs from 'dayjs'

const user = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  major: '',
  uin: '',
  year: '',
  tshirt_size: '',
  aggie_ring_day: '',
  birthday: null,
  graduation_day: null,
}

const renderComponent = (props = {}) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserForm {...props} />
    </LocalizationProvider>
  )
}

describe('UserForm', () => {
  const mockOnChange = jest.fn()
  const mockOnSubmit = jest.fn((e) => e.preventDefault())
  const mockHandleCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders form fields correctly', () => {
    renderComponent({
      user,
      loading: false,
      error: null,
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    })

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Major/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/UIN/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Graduation Year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Shirt Size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Aggie Ring Day/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Graduation Day/i)).toBeInTheDocument()
  })

  test('handles input changes correctly', () => {
    renderComponent({
      user,
      loading: false,
      error: null,
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    })

    const userData = {
      first_name: 'Gemma',
      last_name: 'Goddard',
      phone: '5125968393',
      email: 'gemgoddard@yahoo.com',
      major: 'Aerospace Engineering',
      uin: '123456789',
      year: '2024',
      tshirt_size: 'XL',
      birthday: '05/25/2003',
      aggie_ring_day: '05/25/2003',
      graduation_day: '05/25/2003',
    }

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: userData.first_name },
    })

    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: userData.last_name },
    })

    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: userData.phone },
    })

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: userData.email },
    })

    fireEvent.change(screen.getByLabelText(/Major/i), {
      target: { value: userData.major },
    })

    fireEvent.change(screen.getByLabelText(/UIN/i), {
      target: { value: userData.uin },
    })

    fireEvent.change(screen.getByLabelText(/Graduation Year/i), {
      target: { value: userData.year },
    })

    fireEvent.change(screen.getByLabelText(/Shirt Size/i), {
      target: { value: userData.tshirt_size },
    })

    fireEvent.change(screen.getByLabelText(/Birthday/i), {
      target: { value: userData.birthday },
    })

    fireEvent.change(screen.getByLabelText(/Aggie Ring Day/i), {
      target: { value: userData.aggie_ring_day },
    })

    fireEvent.change(screen.getByLabelText(/Graduation Day/i), {
      target: { value: userData.graduation_day },
    })

    expect(mockOnChange).toHaveBeenCalledTimes(9)
    expect(mockOnChange).toHaveBeenCalledWith('first_name', 'Gemma')
    expect(mockOnChange).toHaveBeenCalledWith('last_name', 'Goddard')
    expect(mockOnChange).toHaveBeenCalledWith('phone', '5125968393')
    expect(mockOnChange).toHaveBeenCalledWith('email', 'gemgoddard@yahoo.com')
    expect(mockOnChange).toHaveBeenCalledWith('uin', '123456789')
    expect(mockOnChange).toHaveBeenCalledWith('year', '2024')
    expect(mockOnChange).toHaveBeenCalledWith('birthday', expect.anything())
    expect(mockOnChange).toHaveBeenCalledWith(
      'aggie_ring_day',
      expect.anything()
    )
    expect(mockOnChange).toHaveBeenCalledWith(
      'graduation_day',
      expect.anything()
    )
  })

  test('calls handleCancel when Cancel button is clicked', () => {
    renderComponent({
      user,
      loading: false,
      error: null,
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    })

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(mockHandleCancel).toHaveBeenCalled()
  })

  test('displays error messages when form errors are present', () => {
    renderComponent({
      user,
      loading: false,
      error: null,
      formError: {
        first_name: true,
        last_name: true,
        phone: true,
        email: true,
      },
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    })

    expect(screen.getByText(/First Name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Phone Number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Valid Email is required/i)).toBeInTheDocument()
  })

  test('displays error alert when error prop is present', () => {
    const errorMessage = 'An error occurred'
    renderComponent({
      user,
      loading: false,
      error: { message: errorMessage },
      formError: {},
      onChange: mockOnChange,
      onSubmit: mockOnSubmit,
      handleCancel: mockHandleCancel,
    })

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
