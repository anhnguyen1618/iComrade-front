import React from 'react';
import classnames from 'classnames';

import {REMOVE_ROOM, BOOK_ROOM, STATUS_NOT_BOOK, STATUS_BOOK, CANCEL_ROOM} from '../../constants/action'
import {getStatus} from '../../utils/helpers'

const Room = ({roomName, numberOfPeopleInUse, queueNumber, emitRoomAction, userIsAdmin}) => {
  const roomClasses = classnames({
    'room': true,
    'room-booked-run': !queueNumber,
    'room-booked-occupy': numberOfPeopleInUse && queueNumber === STATUS_NOT_BOOK,
    'room-booked-queue': queueNumber > STATUS_BOOK
  });

  return (
    <div className="room-container">

      {userIsAdmin && (
        <div className="btn-delete" onClick={() => emitRoomAction(REMOVE_ROOM, roomName)}>
          <img src="https://image.ibb.co/htCMRQ/rubbish_bin.png"/>
        </div>
      )}


      <div className={roomClasses}>
        <div className="room__header">
          <span className="room-name">{roomName}</span>
        </div>
        <div className="room__info">
          <div className="room__info-container">
						<span className="room__info-status">
							{getStatus(numberOfPeopleInUse, queueNumber)}
						</span>
            <div className="button-group">
              {
                queueNumber === STATUS_NOT_BOOK &&
                (<button
                  className="waves-effect waves-light btn btn-book"
                  onClick={() => emitRoomAction(BOOK_ROOM, roomName)}>Book</button>)
              }


              {
                queueNumber >= STATUS_BOOK && (
                  <button
                    className="waves-effect waves-light btn btn-warning"
                    onClick={() => emitRoomAction(CANCEL_ROOM, roomName)}>
                    Cancel
                  </button>)
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room;
