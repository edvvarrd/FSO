import { useUser } from '../context/userContext'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Recommend = () => {
	const user = useUser()

	const books = useQuery(ALL_BOOKS, {
		variables: {
			genre: user ? user.favoriteGenre : null,
		},
	})

	if (books.loading) {
		return <p>Loading books...</p>
	} else if (books.error) {
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

export default Recommend
