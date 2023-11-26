import { useState } from 'react'

const Blog = ({ blog, like, loggedUser, remove }) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }
	const showIfCreated = {
		display: blog.user.username === loggedUser.username ? '' : 'none',
	}
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div style={blogStyle} className="blog">
			{blog.title} by {blog.author}
			<button onClick={() => setVisible(!visible)}>
				{visible ? 'hide' : 'show'}
			</button>
			<div style={showWhenVisible} className="blogExtend">
				<ul>
					<li>{blog.url}</li>
					<li>
						likes: {blog.likes} <button onClick={() => like(blog)}>like</button>
					</li>
					<li>{blog.user.name}</li>
				</ul>
				<button onClick={() => remove(blog)} style={showIfCreated}>
					remove
				</button>
			</div>
		</div>
	)
}

export default Blog
