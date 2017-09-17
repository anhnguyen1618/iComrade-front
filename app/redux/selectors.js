export const getUrgentRooms = (state) => {
	const allRoomNumber = state.queueNumbers
	const keys = Object.keys(allRoomNumber)
	const urgentRooms = keys.filter(key => allRoomNumber[key] === 0 )
	return urgentRooms
}