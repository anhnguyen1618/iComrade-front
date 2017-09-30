import React from 'react';
import classnames from 'classnames';

import { REMOVE_ROOM, BOOK_ROOM, FINISH_ROOM, CANCEL_ROOM} from '../../constants/action'
import { getStatus } from '../../utils/helpers'

const Room = ({ roomName, numberOfPeopleInUse, queueNumber, emitRoomAction }) => {
	const roomClasses = classnames({
		'room': true,
		'room-booked-run': !queueNumber,
		'room-booked-occupy': numberOfPeopleInUse && queueNumber === -1,
		'room-booked-queue': queueNumber > 0
	});

	return (
		<div className="room-container">
			 
			<div className="btn-delete" onClick={() => emitRoomAction(REMOVE_ROOM, roomName)}>
				<img src="https://image.ibb.co/htCMRQ/rubbish_bin.png"/>
			</div>
	
			<div className={roomClasses}>
				<div className="room__header">
					<span className="room-name">{roomName}</span>
				</div>
				<div className="room__info">
					<div className="room__info-container">
						<span className="room__info-status">
							{ getStatus(numberOfPeopleInUse, queueNumber) }
						</span>
						<div className="button-group">
							{ 
								queueNumber === -1 && 
								(<button 
									className="waves-effect waves-light btn btn-book"
									onClick={() => emitRoomAction(BOOK_ROOM, roomName)}>Book</button>) 
							}


	            { 
	            	queueNumber >= 0 && (
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
