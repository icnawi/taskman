import actions from '../constants/taskConstants';
import { IActionCreator } from "../interfaces/IReducers";

export const startFetchingTasks: IActionCreator = () => ({
    type: actions.FETCH_TASKS_START
});

export const fetchTasksSuccess: IActionCreator<string[]> = payload => ({
    type: actions.FETCH_TASKS_SUCCESS,
    payload
});

export const fetchTasksFailure: IActionCreator<string> = payload => ({
    type: actions.REMOVE_TASK_FAILURE,
    payload
});

export const startOpenTask: IActionCreator = () => ({
    type: actions.OPEN_TASK_START
});

export const fetchTaskSuccess: IActionCreator<string[]> = payload => ({
    type: actions.OPEN_TASK_SUCCESS,
    payload
});

export const fetchTaskFailure: IActionCreator<string> = payload => ({
    type: actions.OPEN_TASK_FAILURE,
    payload
});


