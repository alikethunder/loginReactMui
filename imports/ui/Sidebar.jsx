import * as React from 'react';

import { useLocation } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LoginButtons from './LoginButtons';

const drawerWidth = 240;

function Sidebar(props) {

    Session.setDefault('sidebarMobileOpened', Meteor._localStorage.getItem('sidebarMobileOpened') === 'true');
    Session.setDefault('sidebarWideOpened', Meteor._localStorage.getItem('sidebarWideOpened') === 'true');

    const { window } = props;

    const closeMobileSidebar = () => {
        Meteor._localStorage.setItem('sidebarMobileOpened', false);
        Session.set('sidebarMobileOpened', false);
    }

    const location = useLocation();
    React.useEffect(() => {
        closeMobileSidebar()
    }, [location])

    const toggleMobileSidebarOpened = () => {
        let mobileState = Session.get('sidebarMobileOpened');
        Meteor._localStorage.setItem('sidebarMobileOpened', !mobileState);
        Session.set('sidebarMobileOpened', !mobileState);
    }

    const mobileOpen = useTracker(() => Session.get('sidebarMobileOpened'));

    const wideOpen = useTracker(() => Session.get('sidebarWideOpened'));

    const drawer = (
        <div>
            <Toolbar variant="dense" />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <LoginButtons inSidebar={true} />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer id="mobile"
                    container={container}
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={toggleMobileSidebarOpened}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer id="wide"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        display: { xs: 'none', sm: 'block' },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={wideOpen}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Sidebar;