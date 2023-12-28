import { useNotificationValue } from '../context/notificationContext'

const Notification = () => {
	const message = useNotificationValue()

	const popupStyle = {
		position: 'fixed',
		top: '5%',
		left: '50%',
		transform: 'translateX(-50%)',
		width: '50%',
		padding: '0 10px',
		backgroundColor: '#eee',
		border: '1px solid',
		borderRadius: 8,
		fontSize: 18,
	}

	if (!message) {
		return null
	}
	return (
		<div style={popupStyle}>
			<p>{message}</p>
		</div>
	)
}

export default Notification
