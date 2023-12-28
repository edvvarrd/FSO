import { useField } from '../hooks/index'

import { useNavigate } from 'react-router-dom'

import { useNotify } from '../context/notificationContext'
import { useLogin } from '../context/loginContext'

import blogService from '../services/blogs'
import loginService from '../services/login'

import styled from 'styled-components'

import { PrimaryButton } from './style/Buttons'

const LoginBox = styled.div`
	width: fit-content;
	padding: 0.5em 1em;
	border: 1px solid #023e8a;
	border-radius: 0 5px 5px 5px;
`

const FormTitle = styled.h2`
	margin-bottom: 0.25em;
	font-weight: 300;
	text-transform: uppercase;
`
const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5em;
`

const FormField = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5em;
`

const FormInput = styled.input`
	padding: 0.1em 0.3em;
	border: 1px solid #bbb;
	border-radius: 5px;
	&:hover {
		border: 1px solid #0077b6;
	}
	&:focus {
		outline: none;
		border: 1px solid #023e8a;
	}
`

const LoginButton = styled(PrimaryButton)`
	align-self: flex-end;
`

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
		<LoginBox>
			<FormTitle>log in to application</FormTitle>
			<Form onSubmit={handleLogin}>
				<FormField>
					<label htmlFor="username">Username: </label>
					<FormInput {...usernameForm} />
				</FormField>
				<FormField>
					<label htmlFor="password">Password: </label>
					<FormInput {...passwordForm} />
				</FormField>
				<LoginButton type="submit" id="login">
					login
				</LoginButton>
			</Form>
		</LoginBox>
	)
}

export default LoginForm
