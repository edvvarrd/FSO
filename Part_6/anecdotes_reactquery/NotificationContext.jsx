import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SHOW':
			return action.payload
		case 'HIDE':
			return null
		default:
			return state
	}
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
	const fullContext = useContext(NotificationContext)
	return fullContext[0]
}

export const useNotificationDispatch = () => {
	const fullContext = useContext(NotificationContext)
	return fullContext[1]
}


export const NotificationContextProvider = props => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		null
	)

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
