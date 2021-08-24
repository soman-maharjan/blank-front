import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Guard({ component: Component, routeRedirect, ...rest }) {
    const isAuthenticated = useSelector(state => state.userAuth.isAuthenticated);
    return (
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} /> :
                <Redirect to={{ pathname: routeRedirect, state: { from: props.location } }} />
        )}
        />

    )
}