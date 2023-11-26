import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
	const testingBlog = {
		title: 'testing title',
		author: 'testing author',
		url: 'testing url',
		likes: 2,
		user: {
			name: 'testing user',
			username: 'testinguser',
		},
	}
	const loggedUser = {
		name: 'testing user',
		username: 'testinguser',
	}
	test('renders title and author, but doesnt render url and likes by default', () => {
		const container = render(
			<Blog blog={testingBlog} loggedUser={loggedUser} />
		).container

		const element = container.querySelector('.blog')
		const elementExtend = container.querySelector('.blogExtend')

		expect(element).toHaveTextContent('testing title')
		expect(element).toHaveTextContent('testing author')
		expect(elementExtend).not.toBeVisible()
	})
	test('renders url and likes after clicking the button', async () => {
		const container = render(
			<Blog blog={testingBlog} loggedUser={loggedUser} />
		).container

		const user = userEvent.setup()
		const button = screen.getByText('show')
		await user.click(button)

		const elementExtend = container.querySelector('.blogExtend')

		expect(elementExtend).toBeVisible()
	})
	test('received as props event handles i called twice when clicked twice', async () => {
		const mockHandler = jest.fn()

		render(
			<Blog blog={testingBlog} like={mockHandler} loggedUser={loggedUser} />
		)

		const user = userEvent.setup()

		const likeButton = screen.getByText('like')

		await user.click(likeButton)
		await user.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})
