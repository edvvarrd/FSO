import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import blogService from '../../services/blogs'
import { motion, AnimatePresence } from 'framer-motion'

const Bloglist = () => {
	const blogs = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
		retry: false,
		refetchOnWindowFocus: false,
	})
	if (blogs.isLoading) {
		return <p>Hold on...</p>
	}
	if (blogs.isError) {
		return <p>Error: {blogs.error.message}</p>
	}
	if (blogs.length === 0) {
		return <p>No blogs</p>
	}
	return (
		<AnimatePresence initial={false}>
			{blogs.data
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.15 }}
						key={blog.id}>
						<Blog key={blog.id} blog={blog} />
					</motion.div>
				))}
		</AnimatePresence>
	)
}

export default Bloglist
