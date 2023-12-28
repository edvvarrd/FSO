import { useRef } from 'react'

import { MotionPage } from '../motion/MotionPage'

import Bloglist from './Bloglist'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const Home = () => {
	const blogFormRef = useRef()
	return (
		<MotionPage>
			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<NewBlogForm innerRef={blogFormRef} />
			</Togglable>
			<Bloglist />
		</MotionPage>
	)
}

export default Home
