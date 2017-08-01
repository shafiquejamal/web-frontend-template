import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import promise from 'redux-promise';
import Storage from 'react-native-storage';

import { webSocketWrapper } from './main/web-mobile-common/socket/webSocketWrapper';
import { connectToSocket } from './main/web-mobile-common/socket/actionGenerators';
import {
    authenticationListener } from './main/web-mobile-common/access/authentication/authenticationListener';
import {
    registrationListener } from './main/web-mobile-common/access/registration/registrationListener';

import routes from './routes';
import { authenticateToSocket } from './main/web-mobile-common/access/authentication/actionGenerators'
import { LOGIN_USER } from './main/web-mobile-common/access/authentication/types'
import { LOGIN_LINK, ACTIVATE_FORM_LINK, RESET_PASSWORD_LINK, MANAGE_ACCOUNT_LINK } from './routes.jsx';
import { WS_ROOT_URL } from './main/ConfigurationPaths';

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

const redirects = {
    activateForm: () => hashHistory.push(ACTIVATE_FORM_LINK),
    authentication: () => hashHistory.push(LOGIN_LINK),
    resetPassword: () => hashHistory.push(RESET_PASSWORD_LINK),
    login: () => hashHistory.push(LOGIN_LINK),
    domain: () => hashHistory.push(MANAGE_ACCOUNT_LINK)
};

const storage = new Storage({
    size: 1000,
    storageBackend: window.localStorage,
    defaultExpires: 1000 * 3600 * 24 * 365 * 2,
    enableCache: true,
    sync: {
    }
});

storage.load({
    key: 'loginState',
    autoSync: false,
    syncInBackground: true,
    syncParams: { },
}).then(rawData => {
    if (rawData && rawData.user && rawData.user.token) {
        store.dispatch(authenticateToSocket(rawData.user.token));
    }
});

const sock = webSocketWrapper(store, redirects, WS_ROOT_URL, storage);

store.subscribe(() => sock.wSListener());
store.subscribe(() => authenticationListener(store, redirects, storage));
store.subscribe(() => registrationListener(store, redirects));
store.dispatch(connectToSocket());