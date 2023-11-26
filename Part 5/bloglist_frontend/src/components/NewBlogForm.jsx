import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
	const [formTitle, setFormTitle] = useState('')
	const [formAuthor, setFormAuthor] = useState('')
	const [formURL, setFormURL] = useState('')

	const newBlog = event => {
		event.preventDefault()
		createBlog({
			title: formTitle,
			author: formAuthor,
			url: formURL,
		})
		setFormTitle('')
		setFormAuthor('')
		setFormURL('')
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={newBlog}>
				<div>
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						value={formTitle}
						onChange={({ target }) => setFormTitle(target.value)}
						id="title"
						placeholder="title"
					/>
				</div>
				<div>
					<label htmlFor="author">Author:</label>
					<input
						type="text"
						value={formAuthor}
						onChange={({ target }) => setFormAuthor(target.value)}
						id="author"
						placeholder="author"
					/>
				</div>
				<div>
					<label htmlFor="url">URL:</label>
					<input
						type="text"
						value={formURL}
						onChange={({ target }) => setFormURL(target.value)}
						id="url"
						placeholder="url"
					/>
				</div>
				<button type="submit" id="createBlog">
					create
				</button>
			</form>
		</>
	)
}

export default NewBlogForm
