import SocketService from '../services/socket-service';

import { SHOW_NOTIFICATION, LOAD_QUEUE_NUMBER, DECREASE_QUEUE_NUMBER, STATUS_BOOK, SOCKET, DESTROY_SOCKET} from '../constants/action';

export const promiseFlattenerMiddleWare = ({ dispatch }) => {
  return next => action => {
    if (typeof action.then === 'function') {
      return action.then(dispatch)
    }
    return next(action)
  }
}

export const socketMiddleware = () => {
  return next => action => {
    const { type, payload, protocol } = action;
    if (protocol === SOCKET) {
      const socketService = new SocketService();

      if (type === DESTROY_SOCKET) {
        return socketService.destroy();
      }
      socketService.emitEvent(type, payload);
      return;
    }

    return next(action);
  }
}

export const notificationMiddeware = ({dispatch, getState}) => {
  return next => action => {
    if (action.type === LOAD_QUEUE_NUMBER || action.type === DECREASE_QUEUE_NUMBER) {
      setTimeout(() => {
        const { queueNumbers } = getState();
        const { roomName } = action;
        if (queueNumbers[roomName] === STATUS_BOOK) {
          dispatch({type: SHOW_NOTIFICATION});
        }
      }, 300)
    }
    
    return next(action);
  }
};

