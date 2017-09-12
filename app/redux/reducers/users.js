import { LOG_IN, LOG_OUT } from '../../constants/action'

export const user = (user = null, action) => {
	const { type, payload } = action
	switch(type) {
		case LOG_IN:
			return payload			
		case LOG_OUT:
			return null
	}
	return user
}