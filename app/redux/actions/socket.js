import { SOCKET } from '../../constants/action'

export const getRoomAction = (type, roomName) => {
	return { protocol: SOCKET, type, payload: roomName };
};