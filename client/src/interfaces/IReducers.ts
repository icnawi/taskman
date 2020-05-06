import { Dispatch, AnyAction, Action } from "redux";

export type IActionHandler<State> = (state: State, payload?: any) => State;

export interface IActionHandlers<State> {
    [key: string]: IActionHandler<State>;
}

export interface IActionObject<P = null> {
    type: string;
    payload?: P
}

export type IActionCreator<P = null> = (payload?: P) => IActionObject<P>;

export interface IMainReducer {
    data: any[];
}

export interface IUserReducer {
    isLoggedIn: boolean;
    error: string
}

export interface ITaskReducer extends IMainReducer {
    error: string
}