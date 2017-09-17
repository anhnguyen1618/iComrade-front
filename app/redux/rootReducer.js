import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { roomReducer as rooms } from './reducers/room'
import { queueNumberReducer as queueNumbers } from './reducers/queueNumbers'
import { user } from './reducers/users'
import { notificationIsShown } from './reducers/showNotification'


export default combineReducers({
  rooms,
  queueNumbers,
  user,
  form,
  notificationIsShown
})
