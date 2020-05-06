import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "./store";

import { IAppProps } from "../interfaces/IAppProps";

import './styles/index.scss';

import { UserState } from "./store/user/types";
import { loginRequest, logoutSuccess, loginFailure, checkTokenValidity } from "./store/user/actions";

import { TaskState } from "./store/task/actions";
import { getAllTasks, getTask, createTask,  updateTask, deleteTask } from "./store/task/actions";

export class App extends Component<IAppProps> {
    render(): JSX.Element {
        console.log("Check the props", this.props);
        return (
            <div>

            </div>
        );
    }
}
export default connect();