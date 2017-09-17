import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client'

import Room from '../presentation/Room.jsx'
import CreateButton from '../presentation/Create-button.jsx'
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM,
        FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO, GET_ROOM } from '../../constants/action'
import { startSocketConnection } from '../../services/socket-helpers'
import { logOut } from '../../redux/api'


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
    const { initializeSocket, emitRoomAction } = this.props
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
    const { rooms, queueNumbers, emitRoomAction, logOut } = this.props
    return (
      <div className="container">
        <div className="logoutContainer">
          <img src="https://i.imgur.com/Dz9Tpka.png" className="logout-button" onClick={logOut}/>
        </div>
        <div className="header">
          <h4>Resources</h4>
          <CreateButton emitRoomAction={emitRoomAction}/>
        </div>

        { rooms.map(({roomName, numberOfPeopleInUse}) => {
          const queueNumber = queueNumbers[roomName];
          return (
            <Room
              key={roomName}
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

const mapStateToProps = ({ rooms, queueNumbers, user }) => {
  return {
    rooms,
    queueNumbers,
    hasUser: !!user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeSocket: () => startSocketConnection(dispatch),
    emitRoomAction: (type, roomName) => dispatch({ protocol: 'SOCKET', type, payload: roomName }),
    logOut: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
