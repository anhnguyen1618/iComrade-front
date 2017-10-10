import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { promiseFlattenerMiddleWare, socketMiddleware, notificationMiddeware } from './redux-middleware.js';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, promiseFlattenerMiddleWare, socketMiddleware, notificationMiddeware),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;
