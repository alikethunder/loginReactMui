import React from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import AssignmentIcon from '@mui/icons-material/Assignment';
import TranslateIcon from '@mui/icons-material/Translate';

import { SettingsCollection } from '/imports/db/collections/settings';

export default function TranslationMenu() {

    Meteor.subscribe('languageSettings');

    let [searchParams, setSearchParams] = useSearchParams();

    const languageSettings = useTracker(() => SettingsCollection.findOne({ _id: 'languages' }));

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (language) => {
        
        setSearchParams({ language });

        Meteor._localStorage.setItem('language', language);
    }

    return (
        <React.Fragment>
            <IconButton
                aria-label="TranslateIcon"
                size="large"
                color="inherit"

                onClick={handleClick}
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ p: '4px' }}
            >
                <TranslateIcon fontSize="inherit" />
            </IconButton>
            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                id="language-menu"
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
                <MenuList dense sx={{ py: 0 }}>
                    {languageSettings && languageSettings.languages.map((l, i, a) =>
                        <MenuItem key={l.abbr} onClick={() => changeLanguage(l.abbr)} divider={i + 1 !== a.length}>
                            <ListItemIcon>
                                <AssignmentIcon fontSize="small" />
                            </ListItemIcon>
                            {l.name}
                        </MenuItem>
                    )}
                </MenuList>
            </Menu>
        </React.Fragment>
    )
}