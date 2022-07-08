import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useSnackbar } from 'notistack';

import { LinkWithQuery } from '/imports/ui/parts/links/LinkWithQuery';
import Translation from '/imports/ui/parts/translation/Translation';

export default function SignIn() {

  let navigate = useNavigate();
  const { search } = useLocation();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState(false);
  const [emailIsValid, setEmailIsValid] = React.useState(true);
  const [emailFirstBlur, setEmailFirstBlur] = React.useState(true);
  const [passwordFirstBlur, setPasswordFirstBlur] = React.useState(false);
  const [rememberUser, setRememberUser] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const emailBlur = (e) => {
    setEmailFirstBlur(false);
    setEmailIsValid(!!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  }

  const setAndValidateEmail = (e) => {
    setEmail(e.target.value);
    if (!emailFirstBlur) {
      setEmailIsValid(!!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setPasswordFirstBlur(true);
    
    if (emailIsValid && password.length) {
      console.log({
        email
      }, password);
      Meteor.loginWithPassword({
        email
      },
      password, (e)=>{
        if (e){
          console.log('sign in error ', e);
          enqueueSnackbar(e.reason, {variant: 'error', preventDuplicate: true});
          return
        }
        console.log('sign in success ');
        closeSnackbar();
        enqueueSnackbar('Signed in successfully ', {variant: 'success', preventDuplicate: true});
        Meteor._localStorage.setItem('rememberUser', rememberUser);
        sessionStorage.setItem('refresh', true);
        navigate(`/${search}`);
      });
    }
    else {
      console.log('there are errors');

      enqueueSnackbar('Fill all fields properly, please', {variant: 'error', preventDuplicate: true});
    }
  };

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
    let e = event.target.closest('.MuiInputBase-root').querySelector('input');
    setTimeout(function () {
      e.setSelectionRange(-1, -1);
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField name="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus

            onBlur={emailBlur}

            onChange={setAndValidateEmail}
            error={!emailIsValid}
            helperText={!emailIsValid ? "Incorrect email" : ' '}
            sx={{ mb: 0 }}
          />

          <TextField name="password"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"

            onChange={(e)=>setPassword(e.target.value)}
            onBlur={(e)=>setPasswordFirstBlur(true)}

            error={!password.length && passwordFirstBlur}
            helperText={(!password.length && passwordFirstBlur) ? "Password Required" : ' '}

            sx={{ mb: 0 }}

            InputProps={{
              endAdornment:
                <InputAdornment position="end" >
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
          />

          <FormControlLabel
            control={<Checkbox color="primary" checked={rememberUser} onChange={(e)=>setRememberUser(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}/>}
            label={<Translation phrase='remember_me' size='0.5rem' capitalize/>}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={LinkWithQuery} to="/forgot_password" variant="body2">
              <Translation phrase='forgot_password' size='16px' capitalize/>
              </Link>
            </Grid>
            <Grid item>
              <Link component={LinkWithQuery} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  );
}