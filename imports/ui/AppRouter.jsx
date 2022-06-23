import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { AppTopBar } from './AppTopBar';
import Sidebar from './Sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import SignIn from './routes/AccountsForms/SignIn';
import SignUp from './routes/AccountsForms/SignUp';
import ForgotPassword from './routes/AccountsForms/ForgotPassword';
import Home from './routes/SitePages/Home';

import { SnackbarProvider } from 'notistack';
import Slide from '@mui/material/Slide';

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}

export const AppRouter = () => (
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
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >

        <Toolbar variant="dense"/>

        <Routes>

          <Route path="signin" element={<SignIn />} />

          <Route path="signup" element={<SignUp />} />

          <Route path="forgot_password" element={<ForgotPassword />} />

          <Route path="/" element={<Home />} />

        </Routes>

      </Box>

    </BrowserRouter>
  </SnackbarProvider >
);
