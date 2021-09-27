import * as ActionTypes from '../ActionTypes';
import { LoginUserService, LogOutUserService, RegisterUserService } from '../services/AuthService';

export const LoginAction = (credentials, history) => {
    return (dispatch) => {

        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        dispatch({ type: ActionTypes.LOADING });

        Promise.resolve(LoginUserService(credentials)).then(res => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: ActionTypes.LOGIN_SUCCESS });
                history.push('/home');
            } else {
                dispatch({ type: ActionTypes.LOGIN_ERROR, res });
            }
        })
    }
}

export const LogoutAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        Promise.resolve(LogOutUserService()).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: ActionTypes.LOGOUT_SUCCESS, res });
            } else {
                dispatch({ type: ActionTypes.LOGOUT_ERROR, res });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}


export const RegisterAction = (credentials, history) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        dispatch({ type: ActionTypes.LOADING });
        Promise.resolve(RegisterUserService(credentials)).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: ActionTypes.SIGNUP_SUCCESS, res });
                console.log(credentials);
                dispatch(LoginAction({ 'email': credentials.email, 'password': credentials.password }, history));
            } else {
                dispatch({ type: ActionTypes.SIGNUP_ERROR, res });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}