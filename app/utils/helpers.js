
export const getStatus = (numberOfPeopleInUse, queueNumber) => {
	if (!numberOfPeopleInUse) return 'Available';

	if (queueNumber === 0) return 'QUICK! YOUR TURN';

	if (queueNumber === -1) return `People in use: ${numberOfPeopleInUse}`;

	if (queueNumber > 0) return `Your number: ${queueNumber}`
}

export const populateRoomInfo = (data) => {
	return Object.keys(data).map(key => ({roomName: key, numberOfPeopleInUse : data[key]}))
}
