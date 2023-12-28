import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.payload
		case 'HIDE':
			return null
		default:
			return state
	}
}
export const useNotificationValue = () => {
	const fullContext = useContext(NotificationContext)
	return fullContext[0]
}

export const useNotify = () => {
	const fullContext = useContext(NotificationContext)
	const dispatch = fullContext[1]
	return payload => {
		dispatch({ type: 'SET', payload })
		setTimeout(() => {
			dispatch({ type: 'HIDE' })
		}, 7000)
	}
}

export const NotificationContextProvider = ({ children }) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		null
	)

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
