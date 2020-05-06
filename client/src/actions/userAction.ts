import actions from "../constants/userConstants";
import { IActionCreator } from "../interfaces/IReducers";

export const registerPending: IActionCreator<boolean> = isRegisterPending => ({
    type: actions.LOGIN_REQUEST,
    isRegisterPending
});

export const registerSuccess: IActionCreator<boolean> = isRegisterSuccess => ({
    type: actions.LOGIN_REQUEST,
    isRegisterSuccess
});

export const registerError: IActionCreator<boolean> = isRegisterError => ({
    type: actions.LOGIN_REQUEST,
    isRegisterError
});

export const requestLogin: IActionCreator<boolean> = isLoginPending => ({
    type: actions.LOGIN_REQUEST,
    isLoginPending
});

export const setLoginSuccess: IActionCreator<boolean> = isLoginSuccess => ({
    type: actions.LOGIN_REQUEST,
    isLoginSuccess
});

export const setLoginError: IActionCreator<boolean> = loginError => ({
    type: actions.LOGIN_REQUEST,
    loginError
});

export const verifyRequest: IActionCreator = () => ({
    type: actions.VERIFY_REQUEST
});

export const checkTokenValidity: IActionCreator<boolean> = isTokenExpired => ({
    type: actions.VERIFY_SUCCESS,
    isTokenExpired
})