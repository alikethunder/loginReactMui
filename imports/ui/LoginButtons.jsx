import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LoginButtons() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box>
                <Button color="inherit" startIcon={<LoginIcon/>}>Login</Button>
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
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                dense="true"
            >
                <MenuList dense>
                    <MenuItem>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="small" />
                        </ListItemIcon>
                        Sign up
                    </MenuItem>

                    <Divider />

                    <MenuItem>
                        <ListItemIcon>
                            <PasswordIcon fontSize="small" />
                        </ListItemIcon>
                        Forgot password
                    </MenuItem>

                    <Divider />

                    <MenuItem>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </React.Fragment>
    )
}