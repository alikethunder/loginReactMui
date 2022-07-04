import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

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

import AssignmentIcon from '@mui/icons-material/Assignment';
import PasswordIcon from '@mui/icons-material/Password';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import TranslateIcon from '@mui/icons-material/Translate';

export default function TranslationMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const user = useTracker(() => Meteor.user());


    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
                <IconButton
                    aria-label="ArrowDropDownIcon"
                    size="large"
                    color="inherit"

                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{ p: '4px' }}
                >
                    <TranslateIcon fontSize="inherit" />
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
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
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