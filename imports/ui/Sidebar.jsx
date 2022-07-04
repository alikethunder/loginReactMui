import * as React from 'react';

import { useLocation } from 'react-router-dom';

import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Toolbar from '@mui/material/Toolbar';

import LoginButtons from './LoginButtons';
import ActiveLink from './ActiveLink';
import DisabledTheme from './DisabledTheme';

function Sidebar(props) {

    const drawerWidth = props.drawerWidth;

    const { window } = props;

    const closeMobileSidebar = () => {
        Meteor._localStorage.setItem('sidebarMobileOpened', false);
        Session.set('sidebarMobileOpened', false);
    }
    //close mobile sidebar on page change
    const location = useLocation();
    React.useEffect(() => {
        closeMobileSidebar()
    }, [location]);

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

            <DisabledTheme>
                <List sx={{ py: 0 }}>
                    <ListItem disablePadding >
                        <ActiveLink to="/" label="Home" icon={<HomeIcon />} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ActiveLink to="/dashboard" label="Dashboard" icon={<InfoIcon />} />
                    </ListItem>
                </List>
            </DisabledTheme>
            <Divider />
            <List sx={{ py: 0 }}>
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