import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import promise from 'redux-promise';

import { webSocketWrapper } from './main/web-mobile-common/socket/webSocketWrapper.jsx';
import {
    authenticationListener } from './main/web-mobile-common/access/authentication/authenticationListener';
import {
    registrationListener } from './main/web-mobile-common/access/registration/registrationListener';

import routes from './routes';
import { LOGIN_USER } from './main/web-mobile-common/access/authentication/actionGenerators'


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

store.subscribe(() => sock.wSListener());
store.subscribe(() => authenticationListener(store));
store.subscribe(() => registrationListener(store));