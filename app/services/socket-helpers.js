import SocketService from './socket-service'
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM, LOAD_QUEUE_NUMBER, DECREASE_QUEUE_NUMBER,
        FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO, GET_ROOM } from '../constants/action'

export const startSocketConnection = (dispatch) => {
  const socketService = new SocketService();

  socketService.addSocketEventHanler(UPDATE_ROOM_INFO, payload => {
    const rooms = Object.keys(payload).map(key => ({roomName: key, numberOfPeopleInUse : payload[key]}))
    dispatch({ type: UPDATE_ROOM_INFO, payload: rooms })
  })

  socketService.addSocketEventHanler(BOOK_ROOM, ({roomName, queueNumber: number}) => {
    dispatch({type: LOAD_QUEUE_NUMBER, roomName, number})
  })

  socketService.addSocketEventHanler(FINISH_ROOM, ({roomName}) => {
    dispatch({type: DECREASE_QUEUE_NUMBER, roomName})
  })

  socketService.addSocketEventHanler(CANCEL_ROOM, ({roomName}) => {
    dispatch({type: DECREASE_QUEUE_NUMBER, roomName})
  })
}
