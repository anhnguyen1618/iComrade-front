import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk';

import { promiseFlattenerMiddleWare, socketMiddleware, notificationMiddeware } from './redux-middleware.js';
import rootReducer from './rootReducer';
import SocketService from '../services/socket-service'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, promiseFlattenerMiddleWare, socketMiddleware, notificationMiddeware),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default store
