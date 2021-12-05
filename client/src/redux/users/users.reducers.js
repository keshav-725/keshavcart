import {
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS
} from "./users.actionTypes";

export const USER_FEATURE_KEY = 'user';

let initialState = {
    loading : false,
    user : null,
    token : null,
    isAuthenticated : false,
    errorMessage : null
};

let userReducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        // register a user
        case REGISTER_USER_REQUEST:
            return {
              ...state,
              loading: true
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        // Login a user
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                loading: false,
                token: payload.token,
                isAuthenticated : true
            };
        case LOGIN_USER_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                errorMessage: payload,
                token: null,
                isAuthenticated : false
            };
        // get User Info
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_INFO_SUCCESS:
            localStorage.setItem('user', JSON.stringify(payload));
            return {
                ...state,
                loading: false,
                user : payload,
                isAuthenticated: true
            };
        case GET_USER_INFO_FAILURE:
            localStorage.removeItem('user');
            return {
                ...state,
                loading: false,
                errorMessage: payload,
                user : null
            };
            // Logout User
        case LOGOUT_USER :
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return  {
                ...state,
                user : null,
                isAuthenticated: false,
                token: null
            };
            // update User Address
        case UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_ADDRESS_SUCCESS:
            localStorage.setItem('user', JSON.stringify(payload));
            return {
                ...state,
                loading: false,
                user : payload,
                isAuthenticated: true
            };
        case UPDATE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        default : return state;
    }
};
export {userReducer};
