import React from 'react';
import { useMatch } from 'react-router-dom';
import { LinkWithQuery } from './LinkWithQuery';

import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function ActiveLink({ icon, label, to }) {

    const theme = useTheme();

    let match = useMatch(to);

    return (
        <ListItemButton component={LinkWithQuery} to={to}
            sx={{
                ...(match && {
                    bgcolor: alpha(theme.palette.primary.main, 0.5),
                }),
                '&:hover': {
                    bgcolor: alpha(theme.palette.primary.light, 0.3),
                }
            }} disabled={!!match} dense>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
        </ListItemButton>
    )
}