import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('src/components/images/Get more from KOD Dev on Patreon.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" fontWeight="bold">
          Write, run & save C++ code online
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
          Code Runner is an online compiler that lets you write, run, and save your C++ code. No need to install anything. It’s free, simple, and fast.
        </Typography>
        <Button variant="contained" color="primary">
          Get started
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
