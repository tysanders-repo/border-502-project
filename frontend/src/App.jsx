import React from 'react'
import Navbar from './components/organisms/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './components/atoms/AppRoutes'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </LocalizationProvider>
  )
}

export default App
