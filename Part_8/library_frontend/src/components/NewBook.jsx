import { useState } from 'react'

import { useMutation, useApolloClient } from '@apollo/client'

import { useNavigate } from 'react-router'

import { ADD_BOOK, ALL_BOOKS, ALL_GENRES } from '../queries'

import { updateCacheBooks, updateCacheGenres } from '../cacheHelper'

const NewBook = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])

	const navigate = useNavigate()

	const client = useApolloClient()

	const [addBook] = useMutation(ADD_BOOK, {
		onCompleted: () => {
			navigate('/books')
		},
		onError: error => {
			const messages = error.graphQLErrors.map(e => e.message).join('\n')
			console.log(messages)
		},
		update: (cache, response) => {
			const bookAdded = response.data.addBook
			updateCacheBooks(client.cache, { query: ALL_BOOKS }, bookAdded)
			bookAdded.genres.forEach(genre => {
				const genreQuery = client.readQuery({
					query: ALL_BOOKS,
					variables: { genre: genre },
				})
				if (genreQuery) {
					updateCacheBooks(
						client.cache,
						{
							query: ALL_BOOKS,
							variables: { genre: genre },
						},
						bookAdded
					)
				}
				const allGenres = client.readQuery({
					query: ALL_GENRES,
				})
				if (allGenres) {
					updateCacheGenres(client.cache, { query: ALL_GENRES }, bookAdded)
				}
			})
		},
	})

	const submit = async event => {
		event.preventDefault()
		addBook({ variables: { title, author, published, genres } })

		setTitle('')
		setPublished('')
		setAuthor('')
		setGenres([])
		setGenre('')
	}
	const addGenre = () => {
		if (genre !== '') {
			setGenres(genres.concat(genre))
		}
		setGenre('')
	}
	return (
		<div style={{ margin: '20px 0' }}>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(parseInt(target.value))}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	)
}

export default NewBook
