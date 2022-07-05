import React from 'react';
import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import { useTracker } from 'meteor/react-meteor-data';

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';

import SignIn from './routes/AccountsForms/SignIn';
import SignUp from './routes/AccountsForms/SignUp';
import ForgotPassword from './routes/AccountsForms/ForgotPassword';
import Home from './routes/Home';
import Info from './routes/Info';
import OnlyForUnsignedUsers from './OnlyForUnsignedUsers';

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

            <Routes location={displayLocation}>

                <Route path="signin" element={
                    <OnlyForUnsignedUsers>
                        <SignIn />
                    </OnlyForUnsignedUsers>
                } />

                <Route path="signup" element={
                    <OnlyForUnsignedUsers>
                        <SignUp />
                    </OnlyForUnsignedUsers>
                }/>

                <Route path="forgot_password" element={
                    <OnlyForUnsignedUsers>
                        <ForgotPassword />
                    </OnlyForUnsignedUsers>
                } />

                <Route path="/dashboard" element={<Info />} />

                <Route path="/" element={<Home />} />

            </Routes>
        </Box>
    )
};