import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk';

import { promiseDispatchMiddleWare, promiseFlattenerMiddleWare } from './redux-middleware.js';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, promiseDispatchMiddleWare, promiseFlattenerMiddleWare),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default store
