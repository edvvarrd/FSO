import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../services/anecdotes'
import { useNotificationDispatch } from '../../NotificationContext'

const AnecdoteForm = () => {
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

	const newAnecdoteMutation = useMutation({
		mutationFn: createNew,
		onSuccess: newAnecdote => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
			setNotification(`${newAnecdote.content} created!`, 5)
		},
		onError: error => {
			const errorMessage = error.response.data.error
			setNotification(errorMessage, 5)
		},
	})

	const onCreate = event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		newAnecdoteMutation.mutate({ content, votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
