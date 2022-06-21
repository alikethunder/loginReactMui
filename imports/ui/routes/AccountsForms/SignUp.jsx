import * as React from 'react';
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

export default function SignUp() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [emailIsValid, setEmailIsValid] = React.useState(true);
  const [emailFirstBlur, setEmailFirstBlur] = React.useState(true);
  const [passwordFirstBlur, setPasswordFirstBlur] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  
  const setAndValidateConfirmPassword = (e)=>{
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password == e.target.value);
  }

  const emailBlur = (e)=>{
    setEmailFirstBlur(false);
    setEmailIsValid(!!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  }

  const setAndValidateEmail = (e) =>{
    setEmail(e.target.value);
    if (!emailFirstBlur){
      setEmailIsValid(!!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setPasswordFirstBlur(true);
    setPasswordsMatch(password.length && password == confirmPassword);
    
    if (emailIsValid && password.length && passwordsMatch){
      console.log({
        email,
        password,
        confirmPassword
      });
    } else {
        console.log('there are errors');
    }
  };

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
    let e = event.target.closest('.MuiInputBase-root').querySelector('input');
    e.focus();
    setTimeout(function(){
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
            sx={{mb:0}}
          />

          <TextField name="password"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            onChange={(e)=>{setPassword(e.target.value);setPasswordsMatch(confirmPassword == e.target.value);}}
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
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  );
}