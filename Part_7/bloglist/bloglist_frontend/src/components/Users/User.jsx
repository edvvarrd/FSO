import { useMatch, Link } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import userService from '../../services/users'

import styled from 'styled-components'

import { MotionSubPage } from '../motion/MotionSubPage'

const HeaderTitle = styled.h2`
	margin: 0.5em 0;
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: 0.1cap;
`

const BlogLink = styled(Link)`
	display: block;
	padding: 0.5em 1em;
	margin: 0.3em 0;
	border-radius: 5px;
	border: 1px solid #0077b6;
	text-decoration: none;
	letter-spacing: 0.1cap;
	&:hover {
		opacity: 0.9;
		box-shadow: 0 0 2px 2px #caf0f8;
	}
`

const User = () => {
	const match = useMatch('/users/:id')
	const users = useQuery({
		queryKey: ['users'],
		queryFn: userService.getAll,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})
	if (users.isLoading) {
		return <p>Hold on...</p>
	}
	if (users.isError) {
		return <p>Error: {users.error.message}</p>
	}

	const user = users
		? users.data.find(user => user.id === match.params.id)
		: null

	if (!user) {
		return (
			<MotionSubPage>
				<p>Couldnt find an user...</p>
				<Link to="/users">Go back</Link>
			</MotionSubPage>
		)
	}
	return (
		<MotionSubPage>
			<HeaderTitle>{user.name} - Created blogs</HeaderTitle>
			{user.blogs.length > 0 ? (
				user.blogs.map(blog => (
					<BlogLink to={`../blogs/${blog.id}`} key={blog.id}>
						{blog.title}
					</BlogLink>
				))
			) : (
				<p>No blogs</p>
			)}
		</MotionSubPage>
	)
}

export default User
