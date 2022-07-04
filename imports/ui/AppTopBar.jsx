import * as React from 'react';
import { Link as RouterLink, useMatch } from 'react-router-dom';

import { Session } from 'meteor/session';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TranslationMenu from './TranslationMenu';
import LoginButtons from './LoginButtons';
import Typography from '@mui/material/Typography';

export const AppTopBar = function () {

  const toggleSidebarOpened = () => {
    let mobileState = Session.get('sidebarMobileOpened');
    Meteor._localStorage.setItem('sidebarMobileOpened', !mobileState);
    Session.set('sidebarMobileOpened', !mobileState);

    let state = Session.get('sidebarWideOpened');
    Meteor._localStorage.setItem('sidebarWideOpened', !state);
    Session.set('sidebarWideOpened', !state);
  }

  let match = (to)=>useMatch(to);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: '100vw', left: '0'}}>
        <Toolbar variant="dense" sx={{ pr: 0 }}>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebarOpened} >
            <MenuIcon />
          </IconButton>

          <Button color="inherit" sx={{ flexGrow: 1 }} component={RouterLink} to="/" disabled={!!match('/')}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }} >
              Site title
            </Typography>
          </Button>

          <TranslationMenu/>
          <LoginButtons />

        </Toolbar>
      </AppBar>
    </Box>
  );
}