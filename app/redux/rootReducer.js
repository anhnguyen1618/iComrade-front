import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { roomReducer as rooms } from './reducers/room'
import { queueNumberReducer as queueNumbers } from './reducers/queueNumbers'
import { user } from './reducers/users'


export default combineReducers({
  rooms,
  queueNumbers,
  user,
  form
})
