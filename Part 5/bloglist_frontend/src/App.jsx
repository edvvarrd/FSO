import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])

	const [formUsername, setFormUsername] = useState('')
	const [formPassword, setFormPassword] = useState('')

	const [user, setUser] = useState(null)

	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState(null)

	const blogFormRef = useRef()

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: formUsername,
				password: formPassword,
			})
			setUser(user)
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setFormUsername('')
			setFormPassword('')
			newNotification(`${user.name} logged in!`, true)
		} catch (error) {
			console.log(error.message)
			newNotification('wrong username or password', false)
		}
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.clear()
		newNotification('logged out!', true)
	}

	const createBlog = async blogObject => {
		try {
			blogFormRef.current.toggleVisibility()
			const response = await blogService.create(blogObject)
			newNotification(
				`a new blog ${response.title} by ${response.author} added!`,
				true
			)
			setBlogs(blogs.concat(response))
		} catch (error) {
			console.log(error.message)
			newNotification(
				'something went wrong! make sure u filled all inputs',
				false
			)
		}
	}

	const handleLike = async blog => {
		try {
			const likedBlog = Object.assign({}, blog)
			likedBlog.user = blog.user.id
			likedBlog.likes++
			const response = await blogService.change(likedBlog)
			setBlogs(blogs.map(blog => (blog.id !== response.id ? blog : response)))
			newNotification(`${blog.title} liked!`, true)
		} catch (error) {
			console.log(error.message)
			newNotification('something went wrong', false)
		}
	}

	const handleRemove = async blog => {
		if (
			window.confirm(`do you want to remove ${blog.title} by ${blog.author}?`)
		) {
			try {
				await blogService.remove(blog)
				setBlogs(blogs.filter(n => n.id !== blog.id))
				newNotification(`${blog.title} removed!`, true)
			} catch (error) {
				console.log(error.message)
				if (error.response.status === 404) {
					newNotification(
						`${blog.name} has already been deleted from the server.`,
						true
					)
				} else if (error.response.status === 401) {
					newNotification('to delete a blog, you have to be its creator', false)
				} else {
					newNotification(`${error.message}`, false)
				}
			}
		}
	}

	const newNotification = (message, status) => {
		setNotificationMessage(message)
		if (!status) {
			setNotificationStatus('negative')
		} else {
			setNotificationStatus('positive')
		}
		setTimeout(() => {
			setNotificationMessage(null)
			setNotificationStatus(null)
		}, 7000)
	}

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	if (!user) {
		return (
			<>
				<Notification
					message={notificationMessage}
					status={notificationStatus}
				/>
				<LoginForm
					handleLogin={handleLogin}
					formUsername={formUsername}
					onChangeUsername={({ target }) => setFormUsername(target.value)}
					formPassword={formPassword}
					onChangePassword={({ target }) => setFormPassword(target.value)}
				/>
			</>
		)
	}
	return (
		<>
			<Notification message={notificationMessage} status={notificationStatus} />
			<h2>blogs</h2>
			<p>
				{user.name} logged in
				<button
					onClick={() => {
						handleLogout()
					}}>
					logout
				</button>
			</p>
			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<NewBlogForm createBlog={createBlog} />
			</Togglable>
			<div>
				{blogs
					.sort((a, b) => b.likes - a.likes)
					.map(blog => (
						<Blog
							key={blog.id}
							blog={blog}
							like={handleLike}
							loggedUser={user}
							remove={handleRemove}
						/>
					))}
			</div>
		</>
	)
}

export default App
