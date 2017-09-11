import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk';

import { promiseDispatchMiddleWare, promiseFlattenerMiddleWare } from './redux-middleware.js';
import rootReducer from './rootReducer';
import SocketService from '../services/socket-service'

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

socketService.addSocketEventHanler('EventName', () => {})


export default store
