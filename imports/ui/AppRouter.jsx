import React from 'react';

import {
  BrowserRouter
} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import { AppTopBar } from './AppTopBar';
import Sidebar from './Sidebar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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
        <Sidebar drawerWidth={drawerWidth} />

        <Content drawerWidth={drawerWidth} />

      </BrowserRouter>
    </SnackbarProvider >
  )
};