export const notificationIsShown = (notificationIsShown = false, action)  => {
	switch(action.type) {
		case 'SHOW_NOTIFICATION':
			return true;
		case 'HIDE_NOTIFICATION':
			return false;
	}

	return notificationIsShown
}