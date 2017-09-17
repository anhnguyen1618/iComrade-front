import SocketService from '../services/socket-service'
export const promiseDispatchMiddleWare = ({ dispatch }) => {
  return next => action => {
    if (typeof action === 'object' && action.types && action.types.length === 2 && action.api) {
      const { types: [requestAction, receiveAction], api } = action
      dispatch(requestAction(true))
      return api.then(res => {
        dispatch(requestAction(false))
        dispatch(receiveAction(res))
      })
    }
    return next(action)
  }
}

export const promiseFlattenerMiddleWare = ({ dispatch }) => {
  return next => action => {
    if (typeof action.then === 'function') {
      return action.then(dispatch)
    }
    return next(action)
  }
}

export const socketMiddleware = ({dispatch}) => {
  return next => action => {
    const { type, payload, protocol } = action;
    if (protocol === 'SOCKET') {
      const socketService = new SocketService()
      socketService.emitEvent(type, payload);
      return;
    }

    return next(action)
  }
}

export const notificationMiddeware = ({dispatch, getState}) => {
  return next => action => {
    if (action.type === 'LOAD_QUEUE_NUMBER' || action.type === 'DECREASE_QUEUE_NUMBER') {
      setTimeout(() => {
        const { queueNumbers } = getState();
        const { roomName } = action;
        if (queueNumbers[roomName] === 0) {
          dispatch({type: 'SHOW_NOTIFICATION'})
        }
      }, 300)
    }
    
    return next(action)
  }
}

