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
import Translation from '/imports/ui/parts/translation/Translation';

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
            Meteor.call('email.checkExistence', email, (e, r) => {
                if (e) {
                    console.log('email.checkExistence method error ', e);
                    return
                }
                if (r) {
                    console.log('email.checkExistence method result ', r);
                    enqueueSnackbar(<Translation phrase='no_account_with_such_email' size='0.5rem' capitalize />, { variant: 'error', preventDuplicate: true });
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
                    enqueueSnackbar(<Translation phrase='sent_reset_password_email' size='0.5rem' capitalize />, { variant: 'success', preventDuplicate: true });
                });
            });
        }
        else {
            console.log('there are errors');
            enqueueSnackbar(<Translation phrase='enter_real_email' size='0.5rem' capitalize />, { variant: 'error', preventDuplicate: true });
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
                    <Translation phrase='forgot_password' size='0.5rem' capitalize />
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField name="email"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={<Translation phrase='email_address' size='0.5rem' capitalize />}
                        autoComplete="email"
                        autoFocus

                        onBlur={emailBlur}

                        onChange={setAndValidateEmail}
                        error={!emailIsValid}
                        helperText={!emailIsValid ? <Translation phrase='incorrect_email' size='0.5rem' capitalize /> : ' '}
                        sx={{ mb: 0 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        <Translation phrase='send_reset_password_email' size='0.5rem' capitalize />
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={LinkWithQuery} to="/signin" variant="body2">
                                <Translation phrase='login' size='0.5rem' capitalize />
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={LinkWithQuery} to="/signup" variant="body2">
                                <Translation phrase='signup' size='16px' capitalize />
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
}