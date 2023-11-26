const Notification = ({ message, status }) => {
	if (!message) {
		return null
	}
	return (
		<div className={`popup ${status}`}>
			<p>{message}</p>
		</div>
	)
}

export default Notification
