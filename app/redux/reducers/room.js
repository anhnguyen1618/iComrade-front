
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM,
        FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO, GET_ROOM } from '../../constants/action'

export const roomReducer = (rooms = [], action) => {
  switch (action.type) {
    case UPDATE_ROOM_INFO:
      return action.payload
  }
  return rooms
}
