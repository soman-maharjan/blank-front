import * as ActionTypes from '../ActionTypes';

const initialState = {
    authResponse: "",
    isAuthenticated: false
};

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authResponse: "Logged In",
                isAuthenticated: true
            };

        case ActionTypes.RESTART_AUTH_RESPONSE:
            return {
                ...state,
                authResponse: ""
            };

        case ActionTypes.LOADING:
            return {
                ...state,
                authResponse: "LOADING"
            };

        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                authResponse: action.res,
            };

        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                authResponse: action.res,
                isAuthenticated: false
            };
        case ActionTypes.LOGOUT_ERROR:
            return {
                ...state,
                authResponse: action.res,
                isAuthenticated: false
            };

        case ActionTypes.CODE_ERROR:
            return {
                ...state,
                authResponse:
                    "There seems to be a problem, please refresh your browser",
            };

        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                authResponse: action.res,
            };

        case ActionTypes.SIGNUP_ERROR:
            return {
                ...state,
                authResponse: action.res,
            };

        default:
            return state;
    }
};

