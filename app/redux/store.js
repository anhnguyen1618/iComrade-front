import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk';

import { promiseDispatchMiddleWare, promiseFlattenerMiddleWare, socketMiddleware } from './redux-middleware.js';
import rootReducer from './rootReducer';
import SocketService from '../services/socket-service'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, promiseDispatchMiddleWare, promiseFlattenerMiddleWare, socketMiddleware),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default store
