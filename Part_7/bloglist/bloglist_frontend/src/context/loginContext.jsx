import { createContext, useContext, useReducer } from 'react'

const LoginContext = createContext()

const loginReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.payload
		case 'CLEAR':
			return null
		default:
			return state
	}
}

export const useLoggedUser = () => {
	const fullContext = useContext(LoginContext)
	return fullContext[0]
}

export const useLogin = () => {
	const fullContext = useContext(LoginContext)
	const dispatch = fullContext[1]
	return payload => {
		dispatch({ type: 'SET', payload })
	}
}
export const useLogout = () => {
	const fullContext = useContext(LoginContext)
	const dispatch = fullContext[1]
	return () => {
		dispatch({ type: 'CLEAR' })
	}
}

export const LoginContextProvider = ({ children }) => {
	const [loginValue, loginDispatch] = useReducer(loginReducer, null)
	return (
		<LoginContext.Provider value={[loginValue, loginDispatch]}>
			{children}
		</LoginContext.Provider>
	)
}

export default LoginContext
