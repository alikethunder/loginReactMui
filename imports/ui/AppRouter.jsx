import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { AppTopBar} from './AppTopBar';

import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import ForgotPassword from './routes/ForgotPassword';


export const AppRouter = () => (
  <BrowserRouter>

    <CssBaseline/>
    <AppTopBar/>
    
    <Routes>

      <Route path="signin" element={<SignIn/>} />

      <Route path="signup" element={<SignUp/>} />

      <Route path="forgot_password" element={<ForgotPassword/>} />

    </Routes>



  </BrowserRouter>
);
