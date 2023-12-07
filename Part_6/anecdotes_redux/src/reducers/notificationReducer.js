import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		showNotification: (state, action) => {
			return action.payload
		},
		// eslint-disable-next-line no-unused-vars
		hideNotification: (state, action) => {
			return null
		},
	},
})
export const setNotification = (text, time) => dispatch => {
	dispatch(showNotification(text))
	setTimeout(() => {
		dispatch(hideNotification())
	}, time * 1000)
}
export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
