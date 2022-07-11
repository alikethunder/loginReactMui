import React from 'react';
import {
    Routes,
    Route,
    useLocation,
    useSearchParams
} from "react-router-dom";

import { useTracker } from 'meteor/react-meteor-data';

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';

import SignIn from '/imports/ui/router/routes/AccountsForms/SignIn';
import SignUp from '/imports/ui/router/routes/AccountsForms/SignUp';
import ForgotPassword from '/imports/ui/router/routes/AccountsForms/ForgotPassword';
import Home from '/imports/ui/router/routes/Home';
import Info from '/imports/ui/router/routes/Info';
import OnlyForUnsignedUsers from '/imports/ui/router/OnlyForUnsignedUsers';

export default function Content(props) {

    const drawerWidth = props.drawerWidth;

    const theme = useTheme();

    const wideOpen = useTracker(() => Session.get('sidebarWideOpened'));

    const { pathname } = useLocation();

    let [searchParams, setSearchParams] = useSearchParams();

    const [displayLocation, setDisplayLocation] = React.useState(pathname);
    const [transitionStage, setTransistionStage] = React.useState("fadeIn");

    React.useEffect(() => {
        if (pathname !== displayLocation) setTransistionStage("fadeOut")
    }, [pathname]);

    React.useEffect(() => {
        let languageInSearchParams = searchParams.get('language');
        if (!searchParams.get('language')) {
            let languageInLocalStorage = Meteor._localStorage.getItem('language');
            let language = '';

            if (!languageInLocalStorage) {
                let browserLanguage = navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage;
                browserLanguage = browserLanguage.slice(0, 2);
                Meteor.call('language.checkExistence', browserLanguage, (e, languageExist) => {
                    if (e) {
                        console.log('language.checkExistence method error ', e);
                        return
                    }
                    language = languageExist && browserLanguage || 'en';
                })
            }
            language = languageInLocalStorage || language;

            setSearchParams({ language });
            Session.set('language', language);
        }
        else {
            Session.set('language', languageInSearchParams);
        }
    }, []);

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
                    setDisplayLocation(pathname);
                }
            }}>

            <Routes location={displayLocation}>

                <Route element={<OnlyForUnsignedUsers />}>

                    <Route path="/signin" element={<SignIn />} />

                    <Route path="/signup" element={<SignUp />} />

                    <Route path="/forgot_password" element={<ForgotPassword />} />

                </Route>

                <Route path="/dashboard" element={<Info />} />

                <Route path="/" element={<Home />} />

            </Routes>
        </Box>
    )
};