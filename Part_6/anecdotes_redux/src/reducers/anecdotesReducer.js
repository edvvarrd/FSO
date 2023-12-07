import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdotesSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote: (state, action) => {
			state.push(action.payload)
		},
		setAnecdotes: (state, action) => {
			return action.payload
		},
		updateAnecdote: (state, action) => {
			return state.map(anecdote =>
				anecdote.id !== action.payload.id ? anecdote : action.payload
			)
		},
	},
})

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdotesService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const anecdote = await anecdotesService.createNew(content)
		dispatch(appendAnecdote(anecdote))
	}
}

export const vote = anecdote => {
	return async dispatch => {
		const updatedAnecdote = await anecdotesService.update({
			...anecdote,
			votes: anecdote.votes + 1,
		})
		dispatch(updateAnecdote(updatedAnecdote))
		dispatch(setNotification(`Voted for '${anecdote.content}'!`, 5))
	}
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
	anecdotesSlice.actions
export default anecdotesSlice.reducer
