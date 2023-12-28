import { Link } from 'react-router-dom'

import styled from 'styled-components'

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

const Blog = ({ blog }) => {
	return <BlogLink to={`/blogs/${blog.id}`}>{blog.title}</BlogLink>
}

export default Blog
