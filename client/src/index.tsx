import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import App from './containers/App';

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

const rootTag = <Root />;

render(
    rootTag,
    document.getElementById("application")
);
