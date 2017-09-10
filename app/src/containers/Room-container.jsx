import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import openSocket from 'socket.io-client'

import Room from '../presentation/Room.jsx'
import CreateButton from '../presentation/Create-button.jsx'
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM,
        FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO, GET_ROOM } from '../../constants/action'

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null
    this.state = {
      rooms: [],
      queueNumberStorage: {}
    };

    this.emitRoomAction = this.emitRoomAction.bind(this)
    this.updateQueueNumber = this.updateQueueNumber.bind(this)
    this.cancelAllBooking = this.cancelAllBooking.bind(this)
  }

  componentDidMount() {
    const socket = openSocket('http://localhost:8000', { query: 'token=TOKEN_HERE'});
    this.socket = socket; 
    socket.on(BOOK_ROOM, ({roomName, queueNumber}) => {
      this.updateQueueNumber(roomName, 'LOAD', queueNumber)
    });

    socket.on(FINISH_ROOM, ({roomName}) => {
      this.updateQueueNumber(roomName, 'DECREASE')
    });

    socket.on(CANCEL_ROOM, ({roomName}) => {
      this.updateQueueNumber(roomName, 'LOAD', -1)
    });

    socket.on(UPDATE_ROOM_INFO, data => {
      const rooms = Object.keys(data).map(key => ({roomName: key, numberOfPeopleInUse : data[key]}))
      this.setState({...this.state, rooms})
    });
    socket.emit(GET_ROOM)

    window.addEventListener('beforeunload', this.cancelBooking);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.cancelBooking);
  }

  cancelAllBooking() {
    const { rooms } = this.state;
    rooms.forEach(({roomName}) => {
      this.socket.emit(CANCEL_ROOM, roomName);
    })
  }

  updateQueueNumber(roomName, action, number) {
    const queueNumberStorage = { ...this.state.queueNumberStorage }
    switch(action) {
      case 'LOAD':
        queueNumberStorage[roomName] = number;
        this.setState({...this.state, queueNumberStorage: queueNumberStorage});
        return ;
      case 'DECREASE':
        if (queueNumberStorage[roomName] >=0 ) {
          queueNumberStorage[roomName] =  queueNumberStorage[roomName] - 1;
          this.setState({...this.state, queueNumberStorage: queueNumberStorage});
          return ;
        }
    }
  }

  emitRoomAction(action, roomName) {
    this.socket.emit(action, roomName)
  }

  render() {
    const { queueNumberStorage, rooms } = this.state;
    return (
      <div className="container">
        <div className="header">
          <h1>Resources</h1>
          <CreateButton emitRoomAction={this.emitRoomAction}/>
        </div>
          
        { rooms.map(({roomName, numberOfPeopleInUse}) => (
            <Room
              roomName={roomName}
              numberOfPeopleInUse={numberOfPeopleInUse}
              emitRoomAction={this.emitRoomAction}
              queueNumber={queueNumberStorage[roomName] >= 0 ? queueNumberStorage[roomName] : -1}
            />
          ))
        }
      </div>
    )
  }
}

export default Main
