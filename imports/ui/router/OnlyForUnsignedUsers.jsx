import React from 'react';

import {
    Navigate, Outlet, useLocation
} from "react-router-dom";

import { useTracker } from 'meteor/react-meteor-data';

import PageLoading from '/imports/ui/parts/PageLoading';

export default function OnlyForUnsignedUsers() {

    const { search } = useLocation();

    const user = useTracker(() => Meteor.user());

    const loggingIn = useTracker(() => Meteor.loggingIn());

    return loggingIn ? <PageLoading /> : user ? <Navigate key='gohome' to={`/${search}`} replace /> : <Outlet />;
}