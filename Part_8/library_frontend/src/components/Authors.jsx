import { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

import { useUser } from '../context/userContext'

import Select from 'react-select'

const Authors = () => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const user = useUser()

	const authors = useQuery(ALL_AUTHORS, {
		pollInterval: 2000,
	})
	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: error => {
			const messages = error.graphQLErrors.map(e => e.message).join('\n')
			console.log(messages)
		},
	})

	const submit = async event => {
		event.preventDefault()

		editAuthor({ variables: { name: name.value, setBornTo: born } })
		setName('')
		setBorn('')
	}

	if (authors.loading) {
		return <p>Loading authors...</p>
	} else if (authors.error) {
		return <p>Ooops...</p>
	}

	const options = authors.data.allAuthors.map(a => ({
		value: a.name,
		label: a.name,
	}))

	return (
		<div>
			<div>
				<h2>authors</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>born</th>
							<th>books</th>
						</tr>
						{authors.data.allAuthors.map(a => (
							<tr key={a.id}>
								<td>{a.name}</td>
								<td>{a.born}</td>
								<td>{a.bookCount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{user && (
				<div>
					<h2>set birthyear</h2>
					<form onSubmit={submit}>
						<div>
							name
							<Select value={name} onChange={setName} options={options} />
						</div>
						<div>
							born
							<input
								value={born}
								onChange={({ target }) => setBorn(parseInt(target.value))}
							/>
						</div>
						<button>update author</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default Authors
