import React from 'react';
import { useLocation } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

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

import { LinkWithQuery } from '/imports/ui/parts/links/LinkWithQuery';
import ActiveLink from '/imports/ui/parts/links/ActiveLink';
import DisabledTheme from '/imports/ui/parts/DisabledTheme';
import Translation from '/imports/ui/parts/translation/Translation';

import { useSnackbar } from 'notistack';

export default function LoginButtons(props) {

    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { enqueueSnackbar } = useSnackbar();

    const user = useTracker(() => Meteor.user());

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
       // !props.inSidebar && setTimeout(()=>window.dispatchEvent(new Event('resize')));
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

    return (
        <React.Fragment>
            <DisabledTheme>
                {props.inSidebar ?
                    user ?
                        <ListItemButton onClick={logout} dense>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                        :
                        <ActiveLink to="/signin" label={<Translation phrase='login' size={20} capitalize />} icon={<LoginIcon />} />
                    :
                    user ? <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}><Translation phrase='logout' size={20} capitalize /></Button>
                        :
                        <Button color="inherit" startIcon={<LoginIcon />} component={LinkWithQuery} to="/signin" disabled={location.pathname == '/signin'}>
                            <Translation phrase='login' size={20} capitalize />
                        </Button>
                }
            </DisabledTheme>

            <IconButton
                aria-label="ArrowDropDownIcon"
                size="large"
                color="inherit"

                onClick={handleClick}
                aria-controls='account-menu'
                aria-haspopup="true"
                aria-expanded='true'
                sx={{ p: '4px' }}
            >
                <ArrowDropDownIcon fontSize="inherit" />
            </IconButton>
            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                dense="true"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: props.inSidebar ? 'center' : 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: props.inSidebar ? 'center' : 215,
                }}

                sx={{width: '250px'}}
            >
                <MenuList dense sx={{ py: 0 }}>
                    {user ? '' :
                        [
                            <MenuItem key='1' component={LinkWithQuery} to="/signup">
                                <ListItemIcon>
                                    <AssignmentIcon fontSize="small" />
                                </ListItemIcon>
                                <Translation phrase='signup' size={20} capitalize />
                            </MenuItem>,

                            <Divider key='2' />,

                            <MenuItem key='3' component={LinkWithQuery} to="/forgot_password" onChange={(e) => console.log(e)}>
                                <ListItemIcon>
                                    <PasswordIcon fontSize="small" />
                                </ListItemIcon>
                                <Translation phrase='forgot_password' size={20} capitalize />
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