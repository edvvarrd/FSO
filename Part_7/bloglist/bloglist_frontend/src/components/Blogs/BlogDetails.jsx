import { useMatch, Link, useNavigate } from 'react-router-dom'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { useLoggedUser } from '../../context/loginContext'

import blogService from '../../services/blogs'

import { useNotify } from '../../context/notificationContext'

import { useField } from '../../hooks'

import styled from 'styled-components'

import { PrimaryButton, SecondaryButton } from '../style/Buttons'

import { MotionSubPage } from '../motion/MotionSubPage'

const HeaderTitle = styled.h2`
	margin: 0.5em 0;
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: 0.1cap;
`

const DetailedBlog = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5em 0.5em;
	border: 1px solid #0077b6;
	border-radius: 5px;
`

const ContentBox = styled.div`
	display: flex;
	flex-direction: column;
	ul {
		list-style: none;
		li {
			display: flex;
			gap: 0.5em;
			align-items: center;
			margin: 0.5em 0.5em;
		}
	}
`
const LikeButton = styled(SecondaryButton)`
	padding: 0 1em;
`

const CommentsBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1em;
	padding: 0.5em 0.5em;
	h3 {
		font-weight: 300;
		text-transform: uppercase;
	}
	form {
		display: flex;
		gap: 0.5em;
	}
	ul {
		list-style-type: none;
		li {
			width: 100%;
			padding: 0.5em 0.5em;
			&:nth-child(odd) {
				background-color: #eafcff;
			}
		}
	}
`

const FooterBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1em;
	padding: 0.5em 0.5em;
`

const BlogDetails = () => {
	const { reset: resetComment, ...comment } = useField('text')

	const newNotification = useNotify()

	const navigate = useNavigate()

	const match = useMatch('/blogs/:id')

	const user = useLoggedUser()

	const blogs = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const queryClient = useQueryClient()

	const likeMutation = useMutation({
		mutationFn: blogService.change,
		onSuccess: likedBlog => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(
				['blogs'],
				blogs.map(n => (n.id !== likedBlog.id ? n : likedBlog))
			)
			newNotification(`${likedBlog.title} liked!`)
		},
		onError: error => {
			const errorMessage = error.response.data.error
			newNotification(`${errorMessage}`)
		},
	})

	const removeMutation = useMutation({
		mutationFn: blogService.remove,
		onSuccess: removedBlog => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(
				['blogs'],
				blogs.filter(n => n.id !== removedBlog.id)
			)
			navigate('/')
			newNotification(`${removedBlog.title} removed!`)
		},
		onError: error => {
			const errorMessage = error.response.data.error
			newNotification(`${errorMessage}`)
		},
	})

	const commentMutation = useMutation({
		mutationFn: blogService.comment,
		onSuccess: commentedBlog => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(
				['blogs'],
				blogs.map(blog => (blog.id !== commentedBlog.id ? blog : commentedBlog))
			)
			newNotification(`comment added!`)
		},
		onError: error => {
			const errorMessage = error.response.data.error
			newNotification(`${errorMessage}`)
		},
	})

	const handleLike = blog => {
		const likedBlog = Object.assign({}, blog)
		likedBlog.user = blog.user.id
		likedBlog.likes++
		likeMutation.mutate(likedBlog)
	}

	const handleRemove = blog => {
		if (
			window.confirm(`do you want to remove ${blog.title} by ${blog.author}?`)
		) {
			removeMutation.mutate(blog)
		}
	}

	const handleComment = e => {
		e.preventDefault()
		commentMutation.mutate({ id: blog.id, content: comment.value })
		resetComment()
	}

	if (blogs.isLoading) {
		return <p>Hold on...</p>
	}
	if (blogs.isError) {
		return (
			<MotionSubPage>
				<p>Error: {blogs.error.message}</p>
			</MotionSubPage>
		)
	}

	const blog = blogs
		? blogs.data.find(blog => blog.id === match.params.id)
		: null

	if (!blog) {
		return (
			<MotionSubPage>
				<p>Couldnt find a blog...</p>
				<Link to="/">Go back</Link>
			</MotionSubPage>
		)
	}

	const showIfCreated = {
		display: blog.user.username === user.username ? '' : 'none',
	}
	return (
		<MotionSubPage>
			<HeaderTitle>{blog.title}</HeaderTitle>
			<DetailedBlog>
				<ContentBox>
					<ul>
						<li>Author: {blog.author}</li>
						<li>
							URL:{' '}
							<a href={blog.url} target="_blank">
								{blog.url}
							</a>
						</li>
						<li>
							Likes: {blog.likes}
							<LikeButton onClick={() => handleLike(blog)}>like</LikeButton>
						</li>
					</ul>
				</ContentBox>
				<CommentsBox>
					<h3>comments</h3>
					<form onSubmit={handleComment}>
						<input {...comment} />
						<PrimaryButton>comment</PrimaryButton>
					</form>
					<ul>
						{blog.comments.length > 0 ? (
							blog.comments.map((comment, index) => (
								<li key={index}>{comment}</li>
							))
						) : (
							<p>No comments</p>
						)}
					</ul>
				</CommentsBox>
				<FooterBox>
					Created by: {blog.user.name}
					<SecondaryButton
						onClick={() => handleRemove(blog)}
						style={showIfCreated}>
						remove
					</SecondaryButton>
				</FooterBox>
			</DetailedBlog>
		</MotionSubPage>
	)
}

export default BlogDetails
