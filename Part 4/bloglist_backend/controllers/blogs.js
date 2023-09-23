const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {
		blogs: 0,
	})
	response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const blog = new Blog({ ...request.body, user: request.user.id })
	if (blog.title && blog.url) {
		const postedBlog = await blog.save()
		response.status(201).json(postedBlog)
	} else {
		response.status(400).end()
	}
	request.user.blogs = request.user.blogs.concat(blog._id)
	await request.user.save()
})
blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.send(404).end()
	}
})

blogsRouter.delete(
	'/:id',
	middleware.userExtractor,
	async (request, response) => {
		const blog = await Blog.findOne({ _id: request.params.id })
		if (!blog) {
			response.status(404).end()
		} else if (request.user.id !== blog.user.toString()) {
			return response
				.status(401)
				.json({ error: `to delete a blog, u have to be it's creator.` })
		} else {
			await Blog.findByIdAndRemove(blog.id)
			request.user.blogs = request.user.blogs.filter(
				usersBlog => usersBlog.toString() !== blog.id.toString()
			)
			await request.user.save()
			response.status(204).end()
		}
	}
)

blogsRouter.put('/:id', async (request, response) => {
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
		{
			new: true,
		}
	)
	if (!updatedBlog) {
		response.status(404).end()
	} else {
		response.json(updatedBlog)
	}
})

module.exports = blogsRouter
