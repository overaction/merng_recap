import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../context/auth'

// https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx

const AuthRoute = ({component:Component, ...rest}) => {
    const context = useContext(AuthContext);
    return (
        <Route 
            {...rest}
            render={props => (
                !context.user.user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            )}
        />
    )
}

export default AuthRoute
