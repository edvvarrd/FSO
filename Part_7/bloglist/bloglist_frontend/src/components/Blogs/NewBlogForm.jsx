import { useField } from '../../hooks/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotify } from '../../context/notificationContext'

import blogService from '../../services/blogs'

import styled from 'styled-components'
import { PrimaryButton } from '../style/Buttons'

const NewBlog = styled.div`
	display: flex;
	flex-direction: column;
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

const CreateButton = styled(PrimaryButton)`
	align-self: flex-end;
`

const NewBlogForm = ({ innerRef }) => {
	const { reset: resetFormTitle, ...formTitle } = useField('text')
	const { reset: resetFormAuthor, ...formAuthor } = useField('text')
	const { reset: resetFormURL, ...formURL } = useField('text')

	const newNotification = useNotify()

	const queryClient = useQueryClient()

	const newBlogMutation = useMutation({
		mutationFn: blogService.create,
		onSuccess: newBlog => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
			innerRef.current.toggleVisibility()
			newNotification(`${newBlog.title} created!`)
		},
		onError: error => {
			const errorMessage = error.response.data.error
			newNotification(`${errorMessage}`)
		},
	})

	const newBlog = event => {
		event.preventDefault()
		newBlogMutation.mutate({
			title: formTitle.value,
			author: formAuthor.value,
			url: formURL.value,
		})
		resetFormTitle()
		resetFormAuthor()
		resetFormURL()
	}

	return (
		<NewBlog>
			<FormTitle>create new</FormTitle>
			<Form onSubmit={newBlog}>
				<FormField>
					<label htmlFor="title">Title:</label>
					<FormInput {...formTitle} />
				</FormField>
				<FormField>
					<label htmlFor="author">Author:</label>
					<FormInput {...formAuthor} />
				</FormField>
				<FormField>
					<label htmlFor="url">URL:</label>
					<FormInput {...formURL} />
				</FormField>
				<CreateButton type="submit" id="createBlog">
					create <i className="fa-solid fa-pen"></i>
				</CreateButton>
			</Form>
		</NewBlog>
	)
}

export default NewBlogForm
