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
    if (protocol ==== 'SOCKET') {
      // Todo, hook socketService here
      const socketService = {}
      socketService.emitEvent(type, payload);
      return;
    }

    return next(action)
  }
}
