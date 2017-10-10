import React from 'react';
import {connect} from 'react-redux';

import {getUrgentRooms} from '../../redux/selectors'
import {CANCEL_ROOM, FINISH_ROOM, HIDE_NOTIFICATION, SOCKET} from '../../constants/action'

export class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.finishBooking = this.finishBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.audio = null;
  }

  updateBooking(action, urgentRoom) {
    const {emitRoomAction, urgentRooms, hideNotification} = this.props;
    return () => {
      if (urgentRooms.length === 1) {
        hideNotification();
      }
      emitRoomAction(action, urgentRoom);
    }
  }

  cancelBooking(urgentRoom) {
    return this.updateBooking(CANCEL_ROOM, urgentRoom);
  }

  finishBooking(urgentRoom) {
    return this.updateBooking(FINISH_ROOM, urgentRoom);
  }

  playsound() {
    this.audio = document.createElement('audio');
    this.audio.style.display = "none";
    this.audio.src = '/public/noti.mp3';
    this.audio.autoplay = true;
    this.audio.onended = function () {
      this.audio.remove() //Remove when played.
    };
    document.body.appendChild(this.audio);
  }

  componentDidMount() {
    this.playsound();
  }

  componentWillUnmount() {
    if (this.audio) {
      this.audio.remove();
    }
  }

  render() {
    const {emitRoomAction, urgentRooms} = this.props;
    const urgentRoom = urgentRooms[0];
    return (
      <div className="notification-container">
        <div className="notification">
          <h3>Your turn at {urgentRoom} </h3>
          <div className="img-container">
            <img src="https://i.imgur.com/Zi385Mr.png"/>
          </div>
          <div className="button-group">
            <button
              onClick={this.cancelBooking(urgentRoom)}
              className="waves-effect waves-light btn btn-warning">
              Cancel
            </button>
            <button
              onClick={this.finishBooking(urgentRoom)}
              className="waves-effect waves-light btn btn-primary">
              Finish
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    urgentRooms: getUrgentRooms(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    emitRoomAction: (type, roomName) => dispatch({protocol: SOCKET, type, payload: roomName}),
    hideNotification: () => dispatch({type: HIDE_NOTIFICATION})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
