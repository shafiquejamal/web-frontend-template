import ReconnectingWebSocket from 'reconnecting-websocket';

import * as ActionTypes from './types';
import {
  startUpActions,
  setIsConnected,
  setIsDisconnected } from './actionGenerators';
import { logoutUser, authenticateToSocket } from '../access/authentication/actionGenerators';

function logoutUserAndClearStorage(_storage, _store, _redirects) {
  _store.dispatch(logoutUser());
  _redirects.authentication();
  _storage.clearMapForKey('user');
}

export const webSocketWrapper = (store, redirects, WS_ROOT_URL, storage) => {
  const wrapper = {
    webSocket: null,
    postObject(obj) {
      console.log('--> posting:', obj);
      wrapper.webSocket.send(JSON.stringify(obj));
      console.log('------------ posted ---------------');
    },
    stopWS: () => {
      if (wrapper.webSocket) {
        wrapper.webSocket.close();
      }
    },
    startWS: () => {
      console.log('-----> starting webSocket');
      if (wrapper.webSocket) wrapper.webSocket.close();
      wrapper.webSocket = new ReconnectingWebSocket(WS_ROOT_URL);
      wrapper.webSocket.onopen = () => {
        store.dispatch(setIsConnected());
        storage.load({
          key: 'loginState'
        }).then(rawData => {
          if (rawData && rawData.user && rawData.user.token) {
            console.log('on open rawData1', rawData);
            store.dispatch(authenticateToSocket(rawData.user.token));
            startUpActions.forEach(action => store.dispatch(action()));
          } else {
            console.log('on open rawData2', rawData);
            logoutUserAndClearStorage(storage, store, redirects);
          }
        }).catch(err => {
            console.log('storage error', err);
          logoutUserAndClearStorage(storage, store, redirects);
        });
      };

      wrapper.webSocket.onmessage = (msg) => {
        const message = JSON.parse(msg.data);
        console.log('socket received message', message);
        const type = message.socketMessageType;
        const { payload } = message;
        store.dispatch({ type, payload });
      };

      wrapper.webSocket.onerror = (e) => {
        // an error occurred
        console.log('on error', e.message);
        store.dispatch(setIsDisconnected());
      };

      wrapper.webSocket.onclose = (e) => {
        // connection closed
        console.log('on close:', e.code, e.reason);
      };
    },
    wSListener: () => {
      const lastAction = store.getState().lastAction;
      switch (lastAction.type) {
        case ActionTypes.POST_OBJECT:
          return wrapper.postObject(lastAction.obj);

        case ActionTypes.CONNECT:
          return wrapper.startWS();

        default:
          return;
      }
    }
  };

  return wrapper;
};
