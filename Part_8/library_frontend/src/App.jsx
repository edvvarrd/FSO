import { useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

import { useQuery, useSubscription, useApolloClient } from '@apollo/client'

import { useNavigate } from 'react-router-dom'

import { useUser, useSetUser, useLogout } from './context/userContext'

import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from './queries'

import { updateCacheBooks, updateCacheGenres } from './cacheHelper'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'

const menuStyle = {
	display: 'flex',
	gap: '1em',
	marginBottom: '1em',
}

const App = () => {
	const user = useUser()
	const setUser = useSetUser()
	const clearUser = useLogout()

	const client = useApolloClient()

	const navigate = useNavigate()

	const books = useQuery(ALL_BOOKS)

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const bookAdded = data.data.bookAdded
			window.alert(`${bookAdded.title} added!`)

			updateCacheBooks(
				client.cache,
				{
					query: ALL_BOOKS,
				},
				bookAdded
			)
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
			})
			const allGenres = client.readQuery({
				query: ALL_GENRES,
			})
			if (allGenres) {
				updateCacheGenres(client.cache, { query: ALL_GENRES }, bookAdded)
			}
		},
	})

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('library-user'))
		if (user) {
			setUser(user)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const logout = () => {
		clearUser()
		localStorage.clear()
		client.resetStore()
		navigate('/')
	}
	return (
		<>
			<div style={menuStyle}>
				<Link to="/authors">Authors</Link>
				<Link to="/books">Books</Link>
				{user ? <Link to="/newbook">New book</Link> : null}
				{user ? <Link to="/recommend">Recommend</Link> : null}
				{user ? (
					<button onClick={logout}>Logout</button>
				) : (
					<Link to="/login">Login</Link>
				)}
			</div>

			<Routes>
				<Route path="/" element={<Navigate replace to="/authors" />} />
				<Route path="/authors" element={<Authors />} />
				<Route path="/books" element={<Books books={books} />} />
				<Route path="/newbook" element={<NewBook />} />
				<Route path="/recommend" element={<Recommend books={books} />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	)
}
export default App
