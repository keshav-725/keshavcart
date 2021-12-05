import React from "react";
import {useSelector} from "react-redux";
import {Route , Redirect} from 'react-router-dom';
import {USER_FEATURE_KEY} from "../redux/users/users.reducers";

let PrivateRoute = ({component : Component , ...rest}) => {
    let {isAuthenticated , loading} = useSelector((state) => {
        return state[USER_FEATURE_KEY];
    });
    return <Route {...rest} render={(props) => {
            return !loading && !isAuthenticated ? <Redirect to="/users/login"/> : <Component {...props}/>
    }}/>
};
export default PrivateRoute;
