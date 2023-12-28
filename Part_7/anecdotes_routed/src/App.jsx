import { useState } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
	const padding = {
		paddingRight: 5,
	}
	return (
		<div>
			<Link to="/" style={padding}>
				anecdotes
			</Link>
			<Link to="create" style={padding}>
				create new
			</Link>
			<Link to="/about" style={padding}>
				about
			</Link>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map(anecdote => (
				<li key={anecdote.id}>
					<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
				</li>
			))}
		</ul>
	</div>
)

const Anecdote = ({ anecdote }) => {
	return (
		<div>
			<h2>{anecdote.content}</h2>
			<em>{anecdote.author}</em>
			<p>Votes: {anecdote.votes}</p>
			<p>
				For more info see: <a href={anecdote.info}>{anecdote.info}</a>
			</p>
		</div>
	)
}

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or an
			incident. Occasionally humorous, anecdotes differ from jokes because their
			primary purpose is not simply to provoke laughter but to reveal a truth
			more general than the brief tale itself, such as to characterize a person
			by delineating a specific quirk or trait, to communicate an abstract idea
			about a person, place, or thing through the concrete details of a short
			narrative. An anecdote is "a story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you can
			find the best and add more.
		</p>
	</div>
)

const Footer = () => {
	return (
		<div>
			Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
			See
			<a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
				https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
			</a>
			for the source code.
		</div>
	)
}

const CreateNew = props => {
	const { reset: contentReset, ...content } = useField('text')
	const { reset: authorReset, ...author } = useField('text')
	const { reset: infoReset, ...info } = useField('text')

	const handleSubmit = e => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		})
	}

	const handleReset = () => {
		contentReset()
		authorReset()
		infoReset()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button type="submit">create</button>
				<button type="reset" onClick={() => handleReset()}>
					reset
				</button>
			</form>
		</div>
	)
}

const Notification = ({ text }) => {
	const notificationStyle = {
		width: '60%',
		position: 'fixed',
		top: '5%',
		left: '50%',
		transform: 'translateX(-50%)',
		padding: '15 20px',
		backgroundColor: '#fff',
		border: '1px solid',
		textAlign: 'center',
	}
	if (!text) {
		return null
	}
	return (
		<div style={notificationStyle}>
			<p>{text}</p>
		</div>
	)
}

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1,
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2,
		},
	])

	const [notification, setNotification] = useState(null)

	const makeNotification = (text, time) => {
		setNotification(text)
		setTimeout(() => {
			setNotification(null)
		}, time * 1000)
	}

	const navigate = useNavigate()

	const addNew = anecdote => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
		navigate('/')
		makeNotification(`${anecdote.content} created!`, 5)
	}

	const match = useMatch('/anecdotes/:id')
	const anecdote = match
		? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
		: null

	return (
		<>
			<h1>Software anecdotes</h1>
			<Menu />
			{notification ? <Notification text={notification} /> : null}
			<Routes>
				<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
				<Route
					path="/anecdotes/:id"
					element={<Anecdote anecdote={anecdote} />}
				/>
				<Route path="/create" element={<CreateNew addNew={addNew} />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
