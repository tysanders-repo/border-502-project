import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useMediaQuery,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'View Members', link: '/users' },
  ]

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button // This should be included if you want the item to have button-like behavior
            key={index}
            component={Link}
            to={item.link}
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )

  return (
    <>
      <AppBar
        position="static"
        style={{ marginBottom: '30px', padding: '10px' }}
      >
        <Toolbar>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/">
              <img src="/logo.png" alt="Logo" style={{ height: '70px' }} />
            </Link>
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                {drawer}
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                  }}
                >
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      color="inherit"
                      component={Link}
                      to={item.link}
                    >
                      {item.text}
                    </Button>
                  ))}

                  <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/new-member"
                  >
                    New Member?
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
