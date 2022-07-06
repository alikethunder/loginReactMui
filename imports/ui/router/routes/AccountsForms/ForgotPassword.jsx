import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useSnackbar } from 'notistack';


import { LinkWithQuery } from '/imports/ui/parts/links/LinkWithQuery';

export default function ForgotPassword() {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [emailIsValid, setEmailIsValid] = React.useState(true);
    const [emailFirstBlur, setEmailFirstBlur] = React.useState(true);
    const [email, setEmail] = React.useState('');

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

        if (emailIsValid) {
            console.log({
                email
            });
            Meteor.call('email.checkExistence', email, (e, r)=>{
                if (e){
                    console.log('email.checkExistence method error ', e);
                    return
                }
                if (r){
                    console.log('email.checkExistence method result ', r);
                    enqueueSnackbar('There is no account with such email', { variant: 'error', preventDuplicate: true });
                    return
                }
                Meteor.call('email.sendResetPassword', email, (e) => {
                    if (e) {
                        console.log('send reset password  ', e);
                        enqueueSnackbar(e.reason, { variant: 'error', preventDuplicate: true });
                        return
                    }
                    console.log('sent reset password success ');
                    closeSnackbar();
                    enqueueSnackbar('Sent reset password email. Please, check you mailbox', { variant: 'success', preventDuplicate: true });
                });
            });
        }
        else {
            console.log('there are errors');
            enqueueSnackbar('Please enter real email', { variant: 'error', preventDuplicate: true });
        }
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
                    Forgot password
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send reset password email
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={LinkWithQuery} to="/signin" variant="body2">
                                Sign in
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