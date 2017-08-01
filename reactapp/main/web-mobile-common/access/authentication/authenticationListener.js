import { startUpActions } from '../../socket/actionGenerators';

import {
  loginUser,
  updateLoginError,
  updateResetCodeError,
  logoutUser,
  logoutFromSocket } from './actionGenerators';

import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_USER,
  SOCKET_LOGGING_OUT,
  PASSWORD_RESET_CODE_SENT,
  PASSWORD_RESET_SUCCESSFUL,
  PASSWORD_RESET_FAILED,
  PASSWORD_CHANGE_SUCCESSFUL } from './types';

function clearUserFromStorageAndRedirect(_storage, _redirects) {
  _storage.save({
    key: 'loginState',
    rawData: {
      user: null
    },
    expires: null
  });
  _redirects.authentication();
}

export const authenticationListener = (store, redirects, storage) => {
    const lastAction = store.getState().lastAction;
    switch (lastAction.type) {
      case LOGIN_SUCCESSFUL: {
        store.dispatch(loginUser(lastAction.payload));
        startUpActions.forEach(action => store.dispatch(action()));
        storage.save({
          key: 'loginState',
          rawData: {
            user: lastAction.payload
          },
          expires: null
        });
        redirects.domain();
        break;
      }
      case LOGIN_FAILED: {
        store.dispatch(updateLoginError('Invalid login'));
        break;
      }
      case PASSWORD_RESET_CODE_SENT: {
        redirects.resetPassword();
        break;
      }
      case PASSWORD_RESET_SUCCESSFUL: {
        store.dispatch(updateResetCodeError(''));
        redirects.login();
        break;
      }
      case PASSWORD_RESET_FAILED: {
        store.dispatch(updateResetCodeError('Incorrect code'));
        break;
      }
      case PASSWORD_CHANGE_SUCCESSFUL: {
        store.dispatch(logoutUser());
        store.dispatch(logoutFromSocket());
        redirects.authentication();
        break;
      }
      case LOGOUT_USER: {
        store.dispatch(logoutFromSocket());
        clearUserFromStorageAndRedirect(storage, redirects);
        redirects.authentication();
        break;
      }
      case SOCKET_LOGGING_OUT: {
        redirects.authentication();
        clearUserFromStorageAndRedirect(storage, redirects);
        break;
      }
      default:
        return;
    }
};
