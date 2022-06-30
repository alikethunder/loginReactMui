import React from 'react';
import { Link as RouterLink, useMatch } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { alpha } from '@mui/material/styles';

import DisabledTheme from './DisabledTheme';

import { useSnackbar } from 'notistack';

export default function LoginButtons(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const theme = useTheme();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const user = useTracker(() => Meteor.user());

    
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logout = () => {
        Meteor.logout((e) => {
            if (e) {
                enqueueSnackbar(e.reason, { variant: 'error', preventDuplicate: true });
                return
            }
            enqueueSnackbar('Logged out successfully ', { variant: 'success', preventDuplicate: true });
        });
    }

    const sendVirificationEmail = () => Meteor.call('email.sendVerification', (e) => {
        if (e) {
            console.log('error email.sendVerification ', e);
            return
        }
        enqueueSnackbar('Sent email verification. Please check your mailbox', { variant: 'success', preventDuplicate: true });
    });

    const handleClose = () => {
        setAnchorEl(null);
    };

    let match = (to)=>useMatch(to);

    return (
        <React.Fragment>
            <DisabledTheme>
                {props.inSidebar ?
                    user ?
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                        :
                        <ListItemButton component={RouterLink} to="/signin" disabled={!!match('/signin')} sx={{
                            ...(!!match('/signin') && {
                                bgcolor: alpha(theme.palette.primary.main, 0.5),
                            }),
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.light, 0.3),
                            }
                        }}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary='Login' />
                        </ListItemButton>
                    :
                    user ? <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>Logout</Button> :
                        <Button color="inherit" startIcon={<LoginIcon />} component={RouterLink} to="/signin" disabled={!!match('/signin')}>Login</Button>}

                <IconButton
                    aria-label="ArrowDropDownIcon"
                    size="large"
                    color="inherit"

                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <ArrowDropDownIcon fontSize="inherit" />
                </IconButton>
            </DisabledTheme>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                dense="true"
            >
                <MenuList dense>
                    {user ? '' :
                        [
                            <MenuItem key='1' component={RouterLink} to="/signup">
                                <ListItemIcon>
                                    <AssignmentIcon fontSize="small" />
                                </ListItemIcon>
                                Sign up
                            </MenuItem>,

                            <Divider key='2' />,

                            <MenuItem key='3' component={RouterLink} to="/forgot_password">
                                <ListItemIcon>
                                    <PasswordIcon fontSize="small" />
                                </ListItemIcon>
                                Forgot password
                            </MenuItem>
                        ]
                    }

                    {user && !user.emails[0].verified ?
                        <MenuItem key='2'
                            onClick={sendVirificationEmail}
                        >
                            <ListItemIcon>
                                <ForwardToInboxIcon fontSize="small" />
                            </ListItemIcon>
                            Send verification email
                        </MenuItem>
                        :
                        ''
                    }
                </MenuList>
            </Menu>
        </React.Fragment>
    )
}