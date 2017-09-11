import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk';

import { promiseDispatchMiddleWare, promiseFlattenerMiddleWare } from './redux-middleware.js';
import rootReducer from './rootReducer';
import SocketService from '../services/socket-service'
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM, LOAD_QUEUE_NUMBER, DECREASE_QUEUE_NUMBER
        FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO, GET_ROOM } from '../../constants/action'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, promiseDispatchMiddleWare, promiseFlattenerMiddleWare),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

// handle socket event with redux
const dispatch = store.dispatch
const socketService = new SocketService();

socketService.addSocketEventHanler(UPDATE_ROOM_INFO, payload => {
  const rooms = Object.keys(payload).map(key => ({roomName: key, numberOfPeopleInUse : payload[key]}))
  dispatch({ type: UPDATE_ROOM_INFO, payload })
})

socketService.addSocketEventHanler(BOOK_ROOM, ({roomName, queueNumber: number}) => {
  dispatch({type: LOAD_QUEUE_NUMBER, roomName, number})
})

socketService.addSocketEventHanler(FINISH_ROOM, ({roomName}) => {
  dispatch({type: DECREASE_QUEUE_NUMBER, roomName})
})

socketService.addSocketEventHanler(CANCEL_ROOM, ({roomName}) => {
  dispatch({type: DECREASE_QUEUE_NUMBER, roomName})
})


export default store
