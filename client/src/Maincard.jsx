import React from 'react'
import { Box, Typography,Button } from '@mui/material'
import cover from './components/images/cover.jpg'
import { useNavigate } from 'react-router-dom'

const Maincard = () => {
    const navigate = useNavigate();
    function routerchange(e){
        navigate('/Coding')
    }
       

  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${cover})`,
        borderRadius : '100px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'start',
        position: 'relative',
        padding: 10
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" fontWeight="bold">
          Write, run & save C++ code online
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
          Code Runner is an online compiler that lets you write, run, and save your C++ code. No need to install anything. It's free, simple, and fast.
        </Typography>
        <Button variant="outlined" color="primary" onClick={routerchange}>
          Get started
        </Button>
      </Box>
    </Box>
    
  )
}

export default Maincard