import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { initializeAnecdotes } from './reducers/anecdotesReducer'

import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeAnecdotes())
	}, [dispatch])
	return (
		<div>
			<Notification />
			<Filter />
			<Anecdotes />
			<AnecdoteForm />
		</div>
	)
}

export default App
