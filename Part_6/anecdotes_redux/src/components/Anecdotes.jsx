import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdotesReducer'

const Anecdotes = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		if (filter === null) {
			return anecdotes
		}
		const regexp = new RegExp(filter, 'i')
		return anecdotes.filter(anecdote => anecdote.content.match(regexp))
	})
	return (
		<>
			<h2>Anecdotes</h2>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => dispatch(vote(anecdote))}>vote</button>
						</div>
					</div>
				))}
		</>
	)
}

export default Anecdotes
