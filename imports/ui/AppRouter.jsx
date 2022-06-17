import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { AppTopBar} from './AppTopBar';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';



export const AppRouter = () => (
  <Router>
    <CssBaseline/>
    <AppTopBar/>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>

  </Router>
);
