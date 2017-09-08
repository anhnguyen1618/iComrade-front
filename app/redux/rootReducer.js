import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import roomData from './reducers/room'

export default combineReducers({
  roomData,
  form
})
