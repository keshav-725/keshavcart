// registerUser
import {
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS
} from "./users.actionTypes";
import Axios from "axios";
import {setAlert} from "../layout/layout.actions";
import {setAuthToken} from "../../util/setAuthToken";

// register a user
let registerUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({type : REGISTER_USER_REQUEST});
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            let response = await Axios.post('/user/register', JSON.stringify(user) , config);
            dispatch({type : REGISTER_USER_SUCCESS , payload : response.data});
            dispatch(setAlert('Registration Success' , 'success'));
            history.push('/users/login');
        }
        catch (error) {
            console.log(error.response.data.errors);
            let errorList = error.response.data.errors;
            //await errorList.forEach(alert => dispatch(setAlert(alert.msg, 'danger')));
            dispatch({type : REGISTER_USER_FAILURE, payload: error});
        }
    }
};

// login a user
let loginUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({type : LOGIN_USER_REQUEST});
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            let response = await Axios.post('/user/login', JSON.stringify(user) , config);
            dispatch({type : LOGIN_USER_SUCCESS , payload : response.data});
            dispatch(setAlert('Login Success' , 'success'));
            if(localStorage.token){
                dispatch(getUserInfo());
            }
            history.push('/');
        }
        catch (error) {
            console.log(error.response.data.errors);
            let errorList = error.response.data.errors;
            await errorList.forEach(alert => dispatch(setAlert(alert.msg, 'danger')));
            dispatch({type : LOGIN_USER_FAILURE, payload: error});
        }
    }
};

// get User Info
let getUserInfo = () => {
    return async (dispatch) => {
        try {
            if(localStorage.token){
                setAuthToken(localStorage.getItem('token'));
            }
            dispatch({type : GET_USER_INFO_REQUEST});
            let response = await Axios.get('/user/');
            dispatch({type : GET_USER_INFO_SUCCESS , payload : response.data});
        }
        catch (error) {
            dispatch({type : GET_USER_INFO_FAILURE , payload : error});
        }
    }
};

// UPDATE USER ADDRESS
let updateUserAddress = (address) => {
    return async (dispatch) => {
        try {
            if(localStorage.token){
                setAuthToken(localStorage.getItem('token'));
            }
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            dispatch({type : UPDATE_ADDRESS_REQUEST});
            let response = await Axios.post('/user/address' , JSON.stringify(address) , config);
            dispatch({type : UPDATE_ADDRESS_SUCCESS , payload : response.data});
        }
        catch (error) {
            dispatch({type : UPDATE_ADDRESS_FAILURE , payload : error});
        }
    }
};

// logOutUser
let logOut = (history) => {
    return async (dispatch) => {
        try {
            dispatch({type : LOGOUT_USER});
            dispatch(setAlert('Logout is Success' , 'success'));
            history.push('/');
        }
        catch (error) {
            console.error(error);
        }
    };
};

export {registerUser, loginUser , getUserInfo, logOut, updateUserAddress};
