import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
	test('calls the event handler received as props with right details', async () => {
		const createBlog = jest.fn()
		render(<NewBlogForm createBlog={createBlog} />)

		const titleInput = screen.getByPlaceholderText('title')
		const authorInput = screen.getByPlaceholderText('author')
		const urlInput = screen.getByPlaceholderText('url')
		const submitButton = screen.getByText('create')

		await userEvent.type(titleInput, 'testing title')
		await userEvent.type(authorInput, 'testing author')
		await userEvent.type(urlInput, 'testing url')
		await userEvent.click(submitButton)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0]).toStrictEqual({
			title: 'testing title',
			author: 'testing author',
			url: 'testing url',
		})
	})
})
