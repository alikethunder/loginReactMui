import * as React from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";

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

import { Accounts } from 'meteor/accounts-base';

export default function SignUp() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [emailIsValid, setEmailIsValid] = React.useState(true);
  const [emailFirstBlur, setEmailFirstBlur] = React.useState(true);
  const [passwordFirstBlur, setPasswordFirstBlur] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  const [rememberUser, setRememberUser] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const setAndValidateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password == e.target.value);
  }

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
    setPasswordsMatch(password.length && password == confirmPassword);

    if (emailIsValid && password.length && passwordsMatch) {

      console.log({
        email,
        password,
        confirmPassword
      });

      Accounts.createUser({
        email,
        password
      }, (e) => {
        if (e) {
          console.log('sign up error ', e);
          enqueueSnackbar(e.reason, { variant: 'error', preventDuplicate: true });
          return
        }
        console.log('sign up success ');
        closeSnackbar();
        enqueueSnackbar('Signed up successfully ', { variant: 'success', preventDuplicate: true });
        Meteor.call('email.sendVerification');
        Meteor._localStorage.setItem('rememberUser', rememberUser);
        sessionStorage.setItem('refresh', true);
        navigate("/");
      });
    } else {
      console.log('there are errors');

      enqueueSnackbar('Fill all fields properly, please', { variant: 'error', preventDuplicate: true });
    }
  };

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
    let e = event.target.closest('.MuiInputBase-root').querySelector('input');
    e.focus();
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
          Sign up
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
            onChange={(e) => { setPassword(e.target.value); setPasswordsMatch(confirmPassword == e.target.value); }}
            onBlur={(e) => setPasswordFirstBlur(true)}

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

          <TextField name="confirm_password"
            margin="normal"
            required
            fullWidth
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            id="confirm_password"

            onChange={setAndValidateConfirmPassword}
            error={!passwordsMatch}
            helperText={!passwordsMatch ? "Passwords do not match" : ' '}

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
            control={<Checkbox checked={rememberUser} color="primary" onChange={(e) => setRememberUser(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgot_password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  );
}