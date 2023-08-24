const Notification = ({ message, notificationClass }) => {
	if (message === null) {
		return null
	}

	return <div className={`popup ${notificationClass}`}>{message}</div>
}

export default Notification
