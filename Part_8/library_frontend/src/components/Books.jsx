import { useState } from 'react'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = () => {
	const [genreFilter, setGenreFilter] = useState(null)

	const genres = useQuery(ALL_GENRES, { pollInterval: 2000 })

	const books = useQuery(ALL_BOOKS, {
		variables: { genre: genreFilter },
		pollInterval: 2000,
	})

	if (genres.loading) {
		return <p>Loading genres...</p>
	} else if (genres.error) {
		return <p>Ooops...</p>
	}

	if (books.loading) {
		return <p>Loading books...</p>
	} else if (books.error) {
		return <p>Ooops...</p>
	}

	const allGenres = genres.data.allBooks.reduce((array, current) => {
		if (!array.includes(...current.genres)) {
			array.push(...current.genres)
		}
		return array
	}, [])

	return (
		<div>
			<h2>books</h2>

			<button onClick={() => setGenreFilter(null)}>all genres</button>
			{allGenres.map(genre => (
				<button key={genre} onClick={() => setGenreFilter(genre)}>
					{genre}
				</button>
			))}

			{genreFilter && (
				<p>
					in genre <strong>{genreFilter}</strong>
				</p>
			)}

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.data.allBooks.map(book => (
						<tr key={book.id}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Books
