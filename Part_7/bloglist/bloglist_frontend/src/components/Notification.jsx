import { useNotificationValue } from '../context/notificationContext'

import styled from 'styled-components'

const NotificationBox = styled.div`
	position: fixed;
	top: 5%;
	left: 50%;
	transform: translateX(-50%);
	width: 50%;
	padding: 0.5em 1em;
	background-color: #fff;
	border: 1px solid #023e8a;
	border-radius: 5px;
	box-shadow: 0 0 2px 2px #caf0f8;
	font-size: 1.8rem;
`

const Notification = () => {
	const message = useNotificationValue()

	if (!message) {
		return null
	}
	return (
		<NotificationBox>
			<p>{message}</p>
		</NotificationBox>
	)
}

export default Notification
