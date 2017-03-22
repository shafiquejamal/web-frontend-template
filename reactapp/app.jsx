import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import promise from 'redux-promise';

import { webSocketWrapper } from './main/web-mobile-common/socket/webSocketWrapper.jsx';
import { connectToSocket } from './main/web-mobile-common/socket/actionGenerators.jsx';
import {
    authenticationListener } from './main/web-mobile-common/access/authentication/authenticationListener';
import {
    registrationListener } from './main/web-mobile-common/access/registration/registrationListener';

import routes from './routes';
import { LOGIN_USER } from './main/web-mobile-common/access/authentication/actionGenerators'
import { LOGIN_LINK, ACTIVATE_FORM_LINK, RESET_PASSWORD_LINK, MANAGE_ACCOUNT_LINK } from './routes.jsx';


var store = require('configureStore').configure();

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
const username = localStorage.getItem('username');
if (token) {
  store.dispatch({
    type: LOGIN_USER,
    email,
    username
  })
}

require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

const sock = webSocketWrapper(store);
const redirects = {
    activateForm: () => hashHistory.push(ACTIVATE_FORM_LINK),
    authentication: () => hashHistory.push(LOGIN_LINK),
    resetPassword: () => hashHistory.push(RESET_PASSWORD_LINK),
    login: () => hashHistory.push(LOGIN_LINK),
    domain: () => hashHistory.push(MANAGE_ACCOUNT_LINK)
};

store.subscribe(() => sock.wSListener());
store.subscribe(() => authenticationListener(store, redirects));
store.subscribe(() => registrationListener(store, redirects));
store.dispatch(connectToSocket());