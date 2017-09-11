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
    this.props.emitRoomAction(GET_ROOM)


    window.addEventListener('beforeunload', this.cancelAllBooking);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.cancelAllBooking);
  }

  cancelAllBooking() {
    const { rooms, emitRoomAction } = this.props;
    rooms.forEach(({roomName}) => {
      emitRoomAction(CANCEL_ROOM, roomName);
    })
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

const mapStateToProps = ({ rooms, queueNumbers }) => {
  console.log(rooms);
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
