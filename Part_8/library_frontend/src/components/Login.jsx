import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router'

import { useMutation, useLazyQuery } from '@apollo/client'

import { LOGIN, USER } from '../queries'

import { useSetUser } from '../context/userContext'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [getUser] = useLazyQuery(USER)

	const setUser = useSetUser()

	const navigate = useNavigate()

	const [login, loginResult] = useMutation(LOGIN, {
		onCompleted: () => {
			navigate(-1)
		},
		onError: error => {
			const messages = error.graphQLErrors.map(e => e.message).join('\n')
			console.log(messages)
		},
	})

	useEffect(() => {
		if (loginResult.data) {
			const token = loginResult.data.login.value
			localStorage.setItem('library-user-token', token)
			getUser().then(user => {
				localStorage.setItem('library-user', JSON.stringify(user.data.me))
				setUser(user.data.me)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loginResult.data])

	const submit = async event => {
		event.preventDefault()
		login({ variables: { username, password } })

		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					login
					<input
						value={username}
						onChange={({ target }) => {
							setUsername(target.value)
						}}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						onChange={({ target }) => {
							setPassword(target.value)
						}}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default Login
