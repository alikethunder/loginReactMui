import React from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { AppTopBar } from './AppTopBar';
import Sidebar from './Sidebar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import SignIn from './routes/AccountsForms/SignIn';
import SignUp from './routes/AccountsForms/SignUp';
import ForgotPassword from './routes/AccountsForms/ForgotPassword';
import Home from './routes/Home';
import Info from './routes/Info';
import Content from './Content';

import { SnackbarProvider } from 'notistack';
import Slide from '@mui/material/Slide';

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}

const drawerWidth = 240;

export default function AppRouter() {
  const theme = useTheme();

  const wideOpen = useTracker(() => Session.get('sidebarWideOpened'));

  return (
    <SnackbarProvider maxSnack={3}

      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}

      TransitionComponent={Slide}

      ref={notistackRef}

      autoHideDuration={2500}

      action={(key) => (
        <IconButton onClick={onClickDismiss(key)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <CancelIcon />
        </IconButton>
      )}

      iconVariant={{
        error: <PriorityHighIcon />
      }}
    >
      <BrowserRouter>

        <CssBaseline />
        <AppTopBar />
        <Sidebar drawerWidth={240} />

        <Content drawerWidth={240} />

      </BrowserRouter>
    </SnackbarProvider >
  )
};