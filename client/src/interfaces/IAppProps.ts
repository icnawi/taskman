import { UserState } from "./user/UserState";
import { TasksState } from "./task/TaskState";
import {
    startFetchingTasks,
    fetchTasksSuccess,
    fetchTasksFailure,
    startOpenTask,
    fetchTaskSuccess,
    fetchTaskFailure
} from "../actions/taskAction";

import {
    requestLogin,
    setLoginSuccess,
    setLoginError,
    registerPending,
    registerSuccess,
    registerError,
    verifyRequest,
    checkTokenValidity
} from "../actions/userAction";

export interface IAppProps {
    user:                 UserState;
    task:                 TasksState;
    registerPending:      typeof registerPending;
    registerSuccess:      typeof registerSuccess;
    registerError:        typeof registerError;
    requestLogin:         typeof requestLogin;
    setLoginSuccess:      typeof setLoginSuccess;
    setLoginError:        typeof setLoginError;
    verifyRequest:        typeof verifyRequest;
    checkTokenValidity:   typeof checkTokenValidity;
    startFetchingTasks:   typeof startFetchingTasks;
    fetchTasksSuccess:    typeof fetchTasksSuccess;
    fetchTasksFailure:    typeof fetchTasksFailure;
    startOpenTask:        typeof startOpenTask;
    fetchTaskSuccess:     typeof fetchTaskSuccess;
    fetchTaskFailure:     typeof fetchTaskFailure;
    // startCreateTask:      typeof startCreateTask;
    // createTaskSuccess:    typeof createTaskSuccess;
    // createTaskFailure:    typeof createTaskFailure;
    // startUpdateTask:      typeof startUpdateTask;
    // updateTaskSuccess:    typeof updateTaskSuccess;
    // updateTaskFailure:    typeof updateTaskFailure;
    // startDeleteTask:      typeof startDeleteTask;
    // deleteTaskSuccess:    typeof startDeleteTaskSuccess;
    // deleteTaskFailure :   typeof startDeleteTaskFailure;
}