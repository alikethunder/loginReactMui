import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginButtons from './LoginButtons';
import Typography from '@mui/material/Typography';

export const AppTopBar = function () {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ pr: 0 }}>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }} >
            <MenuIcon />
          </IconButton>

          <Button color="inherit" sx={{ flexGrow: 1 }} component={RouterLink} to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Site title
            </Typography>
          </Button>

          <LoginButtons />

        </Toolbar>
      </AppBar>
    </Box>
  );
}