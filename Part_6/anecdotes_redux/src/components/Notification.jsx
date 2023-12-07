import { useSelector } from 'react-redux'

const Notification = () => {
	const style = {
		padding: 10,
		position: 'fixed',
		top: '5%',
		left: '50%',
		transform: `translateX(-50%)`,
		border: 'solid',
		borderWidth: 1,
		backgroundColor: 'white',
	}
	const notification = useSelector(state => state.notification)
	if (!notification) {
		return
	}
	return <div style={style}>{notification}</div>
}

export default Notification
