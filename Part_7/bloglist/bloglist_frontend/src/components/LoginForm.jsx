import { useField } from '../hooks/index'

import { useNavigate } from 'react-router-dom'

import { useNotify } from '../context/notificationContext'
import { useLogin } from '../context/loginContext'

import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = () => {
	const { reset: usernameFormReset, ...usernameForm } = useField('text')
	const { reset: passwordFormReset, ...passwordForm } = useField('password')

	const newNotification = useNotify()
	const login = useLogin()
	const navigate = useNavigate()

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: usernameForm.value,
				password: passwordForm.value,
			})
			login(user)
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogService.setToken(user.token)
			navigate('/')
			newNotification(`${user.name} logged in!`)
		} catch (error) {
			usernameFormReset()
			passwordFormReset()
			if (error.response.status === 500) {
				return newNotification('something wrong with the server...')
			}
			newNotification('wrong username or password')
		}
	}
	return (
		<>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="username">Username: </label>
					<input {...usernameForm} />
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input {...passwordForm} />
				</div>
				<button type="submit" id="login">
					login
				</button>
			</form>
		</>
	)
}

export default LoginForm
