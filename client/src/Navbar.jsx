import React from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static' color='transparent'  elevation={0} sx={{borderBottom: 1, borderColor: 'grey.500', bgcolor:'rgba(16,27,35,255)' }}>
            <Toolbar>
                <Typography variant='h5' fontFamily='monospace' component='div' noWrap flexGrow={1} color='white'>
                    Code Runner
                </Typography>
                <Typography variant='h5' fontFamily='monospace' component='div' sx={{display: {xs: 'none', sm:'block', color:'white'}}}>
                    <Button variant="text" color='white' onClick={() => {navigate('/')}} sx={{mr:1}}>HOME</Button>
                    <Button variant="text" color='white'sx={{mr:1}}>ABOUT</Button>
                    <Button variant="text" color='white'sx={{mr:1}}>CONTACT</Button>
                </Typography>
                <IconButton size='large' edge='end' aria-label='menu' sx={{mr:2, color: 'white'}}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Navbar