import React from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import PageLoading from './PageLoading';
import Home from './routes/Home';

export default function OnlyForUnsignedUsers ({ children }) {

    const user = useTracker(() => Meteor.user());

    const loggingIn = useTracker(() => Meteor.loggingIn());

    if (loggingIn) {
        return <PageLoading />;
    }

    if (user) {
        return <Home />;
    }

    return children;
}