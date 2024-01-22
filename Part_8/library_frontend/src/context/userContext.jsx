import { createContext, useContext, useReducer } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.payload
		case 'CLEAR':
			return null
		default:
			return state
	}
}

export const useUser = () => {
	const fullContext = useContext(UserContext)
	return fullContext[0]
}

export const useSetUser = () => {
	const fullContext = useContext(UserContext)
	const dispatch = fullContext[1]
	return payload => {
		dispatch({ type: 'SET', payload })
	}
}

export const useLogout = () => {
	const fullContext = useContext(UserContext)
	const dispatch = fullContext[1]
	return () => {
		dispatch({ type: 'CLEAR' })
	}
}

export const UserContextProvider = ({ children }) => {
	const [userValue, userDispatch] = useReducer(userReducer, null)
	return (
		<UserContext.Provider value={[userValue, userDispatch]}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
