import actions from "../constants/userConstants";
import {
    IActionHandler,
    IActionHandlers,
    IActionObject,
    IUserReducer,
    ITaskReducer
} from "../interfaces/IReducers";

const initialState: IUserReducer = {
    isLoggedIn: false,
    error: ""
};

const requestLogin: IActionHandler<IUserReducer> = state => ({
    ...state,
    isLoggedIn: false
});

const setLoginSuccess: IActionHandler<IUserReducer> = state => ({
    ...state,
    isLoggedIn: true
});

const setLoginError: IActionHandler<IUserReducer> = state => ({
    ...state,
    isLoggedIn: false,
    error: "Failed to login"
});

const registerSuccess: IActionHandler<IUserReducer> = state => ({
    ...state,
    isLoggedIn: false
});

const registerPending: IActionHandler<IUserReducer> = state => ({
    ...state,
    isLoggedIn: true
});

const registerError: IActionHandler<IUserReducer> = state => ({
    ...state,
    isLoggedIn: false,
    error: "Failed to signup"
});

const reducerSwitch: IActionHandlers<IUserReducer> = {
    [actions.LOGIN_REQUEST]:    requestLogin,
    [actions.LOGIN_SUCCESS]:    setLoginSuccess,
    [actions.LOGIN_FAILURE]:    setLoginError,
    [actions.REGISTER_REQUEST]: registerPending,
    [actions.REGISTER_SUCCESS]: registerSuccess,
    [actions.REGISTER_FAILURE]: registerError
}

export default (state = initialState, action: IActionObject): IUserReducer => {
    const reducer: IActionHandler<IUserReducer> = reducerSwitch[action.type]
    return reducer ? reducer(state, action.payload) : state;
}