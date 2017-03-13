import uniq from 'underscore';

import { addContact } from '../socket/socketActionGenerators';
import { RECEIVE_MESSAGE } from '../socket/socketActionTypes';

export const messageListener = (store) => {
    const lastAction = store.getState().lastAction;
    switch (lastAction.type) {
        case RECEIVE_MESSAGE:
            return store.dispatch(addContact(lastAction.payload.from));
            break;
        default:
            return;

    }
};