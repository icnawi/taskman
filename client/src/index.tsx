import React, { Component } from 'react';
import {render} from 'react-dom';
import './styles/main.sass'


class Root extends Component {
    render(): JSX.Element {
        return (
            <div className="app-container">
                <h1 className="app-container typography-heading-1 error">
                    It's Taskman, man
                </h1>
            </div>
        );
    }
}


const rootTag: JSX.Element = <Root />;

render(
    rootTag,
    document.getElementById("app-root")
);
