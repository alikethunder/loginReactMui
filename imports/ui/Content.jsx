import React from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SignIn from './routes/AccountsForms/SignIn';
import SignUp from './routes/AccountsForms/SignUp';
import ForgotPassword from './routes/AccountsForms/ForgotPassword';
import Home from './routes/Home';
import Info from './routes/Info';

export default function Content(props) {

    const drawerWidth = props.drawerWidth;

    //page transitions
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = React.useState(location);
    const [transitionStage, setTransistionStage] = React.useState("fadeIn");
    React.useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location]);

    const theme = useTheme();

    const wideOpen = useTracker(() => Session.get('sidebarWideOpened'));

    return (
        <Box component="main"
            sx={{
                flexGrow: { sm: 1 },
                padding: { sm: theme.spacing(3) },
                transition: {
                    sm: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    })
                },
                marginLeft: { sm: 0 },
                ...(wideOpen && {
                    transition: {
                        sm: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        })
                    },
                    marginLeft: { sm: `${drawerWidth}px` },
                })
            }}

            className={transitionStage}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn");
                    setDisplayLocation(location);
                }
            }} >
            <Toolbar variant="dense" />

            <Routes location={displayLocation}>

                <Route path="signin" element={<SignIn />} />

                <Route path="signup" element={<SignUp />} />

                <Route path="forgot_password" element={<ForgotPassword />} />

                <Route path="/dashboard" element={<Info />} />

                <Route path="/" element={<Home />} />

            </Routes>
        </Box>
    )
};