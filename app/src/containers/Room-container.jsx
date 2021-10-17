import React from 'react';
import {connect} from 'react-redux';

import Room from '../presentation/Room.jsx'
import CreateButton from '../presentation/Create-button.jsx'

import {CANCEL_ROOM, GET_ROOM, DESTROY_SOCKET, STATUS_NOT_BOOK, STATUS_BOOK} from '../../constants/action'
import {startSocketConnection} from '../../services/socket-helpers'
import {logOut} from '../../redux/api'
import {getRoomAction} from '../../redux/actions/socket'
import {userIsAdmin} from '../../redux/selectors'

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.socketIsStarted = false;

    this.cancelAllBooking = this.cancelAllBooking.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    const {hasUser} = this.props;

    if (hasUser) {
      this.startSocket()
    }

    window.addEventListener('beforeunload', this.cancelAllBooking);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasUser && !this.socketIsStarted) {
      this.startSocket()
    }
  }

  startSocket() {
    this.socketIsStarted = true;
    this.props.initializeSocket()
    this.props.emitRoomAction(GET_ROOM)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.cancelAllBooking);
  }

  cancelAllBooking() {
    const {rooms, emitRoomAction} = this.props;
    rooms.forEach(({roomName}) => {
      emitRoomAction(CANCEL_ROOM, roomName);
    })
  }

  logOut() {
    const {logOut, destroySocket} = this.props
    logOut();
    destroySocket();
  }

  render() {
    const {rooms, queueNumbers, emitRoomAction, userIsAdmin} = this.props
    return (
      <div className="container">
        <div className="logoutContainer">
          <img src="https://i.imgur.com/Dz9Tpka.png" className="logout-button" onClick={this.logOut}/>
        </div>
        <div className="header">
          <h4>Resources</h4>
          {userIsAdmin && <CreateButton emitRoomAction={emitRoomAction}/>}
        </div>

        {rooms.map(({roomName, numberOfPeopleInUse}) => {
          const queueNumber = queueNumbers[roomName];
          return (
            <Room
              key={roomName}
              roomName={roomName}
              numberOfPeopleInUse={numberOfPeopleInUse}
              emitRoomAction={emitRoomAction}
              userIsAdmin={userIsAdmin}
              queueNumber={queueNumber >= STATUS_BOOK ? queueNumber : STATUS_NOT_BOOK}
            />
          )
        })
        }
      </div>
    )
  }
}

const mapStateToProps = ({rooms, queueNumbers, user}) => {
  return {
    rooms,
    queueNumbers,
    hasUser: !!user,
    userIsAdmin: userIsAdmin(user)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeSocket: () => startSocketConnection(dispatch),
    emitRoomAction: (type, roomName) => dispatch(getRoomAction(type, roomName)),
    logOut: () => dispatch(logOut()),
    destroySocket: () => dispatch(getRoomAction(DESTROY_SOCKET))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
