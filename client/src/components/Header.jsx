import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Code Runner
        </Typography>
        <Button color="inherit">Features</Button>
        <Button color="inherit">Pricing</Button>
        <Button color="inherit">Solutions</Button>
        <Button color="inherit">Resources</Button>
        <Button color="inherit">Sign up</Button>
        <Button color="inherit">Log in</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
