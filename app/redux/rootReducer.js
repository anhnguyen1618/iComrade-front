import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { roomReducer as rooms } from './reducers/room'
import { queueNumberReducer as queueNumbers } from './reducers/room'


export default combineReducers({
  roomReducer,
  queueNumbers,
  form
})
