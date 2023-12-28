import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAll, update } from './services/anecdotes'

const App = () => {
	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()

	const setNotification = (text, time) => {
		notificationDispatch({
			type: 'SHOW',
			payload: text,
		})
		setTimeout(() => {
			notificationDispatch({
				type: 'HIDE',
			})
		}, time * 1000)
	}

	const voteMutation = useMutation({
		mutationFn: update,
		onSuccess: updatedAnecdote => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(
				['anecdotes'],
				anecdotes.map(anecdote =>
					anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
				)
			)
			setNotification(`You voted for ${updatedAnecdote.content}`, 5)
		},
	})

	const handleVote = anecdote => {
		voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
	}

	const anecdotesQuery = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAll,
		retry: false,
		refetchOnWindowFocus: false,
	})
	if (anecdotesQuery.isLoading) {
		return <p>hold on...</p>
	}
	if (anecdotesQuery.isError) {
		return <p>anecdote service is not available due to problems in server</p>
	}
	const anecdotes = anecdotesQuery.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
