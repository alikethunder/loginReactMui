import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const LinkWithQuery = React.forwardRef(function ({ children, to, ...props }, ref) {

    const { search } = useLocation();

    return (
        <Link to={to + search} {...props} ref={ref}>
            {children}
        </Link>
    );
});