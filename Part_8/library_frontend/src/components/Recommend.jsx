import { useUser } from '../context/userContext'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS_GENRE } from '../queries'

const Recommend = () => {
	const user = useUser()

	const filteredBooks = useQuery(ALL_BOOKS_GENRE, {
		variables: {
			genre: user ? user.favoriteGenre : null,
		},
	})

	if (filteredBooks.loading) {
		return <p>Loading books...</p>
	} else if (filteredBooks.error) {
		return <p>Error while loading books...</p>
	}

	if (!user) {
		return <p>You need to login first</p>
	}

	return (
		<div>
			<h2>Recommend</h2>
			<p>
				books in your favorite genre: <b>{user.favoriteGenre}</b>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBooks.data.allBooks.map(book => (
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

export default Recommend
