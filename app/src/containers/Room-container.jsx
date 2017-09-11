import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client'

import Room from '../presentation/Room.jsx'
import CreateButton from '../presentation/Create-button.jsx'
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM,
        FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO, GET_ROOM } from '../../constants/action'
import { startSocketConnection } from '../../services/socket-helpers'


export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null
    this.state = {
      rooms: [],
      queueNumberStorage: {}
    };

    this.cancelAllBooking = this.cancelAllBooking.bind(this)
  }

  componentDidMount() {
    this.props.initializeSocket()
    // const socket = openSocket('http://localhost:8000', { query: 'token=TOKEN_HERE'});
    // this.socket = socket;
    // socket.on(BOOK_ROOM, ({roomName, queueNumber}) => {
    //   this.updateQueueNumber(roomName, 'LOAD', queueNumber)
    // });
    //
    // socket.on(FINISH_ROOM, ({roomName}) => {
    //   this.updateQueueNumber(roomName, 'DECREASE')
    // });
    //
    // socket.on(CANCEL_ROOM, ({roomName}) => {
    //   this.updateQueueNumber(roomName, 'LOAD', -1)
    // });
    //
    // socket.on(UPDATE_ROOM_INFO, data => {
    //   const rooms = Object.keys(data).map(key => ({roomName: key, numberOfPeopleInUse : data[key]}))
    //   this.setState({...this.state, rooms})
    // });
    // socket.emit(GET_ROOM)

    // window.addEventListener('beforeunload', this.cancelBooking);
  }

  componentWillUnmount() {
    // window.removeEventListener('beforeunload', this.cancelBooking);
  }

  cancelAllBooking() {
    const { rooms } = this.state;
    rooms.forEach(({roomName}) => {
      this.socket.emit(CANCEL_ROOM, roomName);
    })
  }

  // updateQueueNumber(roomName, action, number) {
  //   const queueNumberStorage = { ...this.state.queueNumberStorage }
  //   switch(action) {
  //     case 'LOAD':
  //       queueNumberStorage[roomName] = number;
  //       this.setState({...this.state, queueNumberStorage: queueNumberStorage});
  //       return ;
  //     case 'DECREASE':
  //       if (queueNumberStorage[roomName] >=0 ) {
  //         queueNumberStorage[roomName] =  queueNumberStorage[roomName] - 1;
  //         this.setState({...this.state, queueNumberStorage: queueNumberStorage});
  //         return ;
  //       }
  //   }
  // }

  emitRoomAction(action, roomName) {
    this.socket.emit(action, roomName)
  }

  render() {
    // const { queueNumberStorage, rooms } = this.state;
    const { rooms, queueNumbers, emitRoomAction } = this.props
    return (
      <div className="container">
        <div className="header">
          <h1>Resources</h1>
          <CreateButton emitRoomAction={emitRoomAction}/>
        </div>

        { rooms.map(({roomName, numberOfPeopleInUse}) => {
          const queueNumber = queueNumbers[roomName];
          return (
            <Room
              roomName={roomName}
              numberOfPeopleInUse={numberOfPeopleInUse}
              emitRoomAction={emitRoomAction}
              queueNumber={queueNumber >= 0 ? queueNumber : -1}
            />
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { rooms, queueNumbers } = this.state;
  return {
    rooms,
    queueNumbers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeSocket: () => startSocketConnection(dispatch),
    emitRoomAction: (type, roomName) => dispatch({ protocol: 'SOCKET', type, payload: roomName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
