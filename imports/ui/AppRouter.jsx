import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { AppTopBar} from './AppTopBar';

import SignIn from './routes/AccountsForms/SignIn';
import SignUp from './routes/AccountsForms/SignUp';
import ForgotPassword from './routes/AccountsForms/ForgotPassword';
import HomePage from './routes/HomePage';


export const AppRouter = () => (
  <BrowserRouter>

    <CssBaseline/>
    <AppTopBar/>
    
    <Routes>

      <Route path="signin" element={<SignIn/>} />

      <Route path="signup" element={<SignUp/>} />

      <Route path="forgot_password" element={<ForgotPassword/>} />

      <Route path="/" element={<HomePage/>} />

    </Routes>



  </BrowserRouter>
);
