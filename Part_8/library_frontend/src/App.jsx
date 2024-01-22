import { useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

import { useApolloClient } from '@apollo/client'

import { useNavigate } from 'react-router-dom'

import { useUser, useSetUser, useLogout } from './context/userContext'

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
				<Route path="/books" element={<Books />} />
				<Route path="/newbook" element={<NewBook />} />
				<Route path="/recommend" element={<Recommend />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	)
}
export default App
