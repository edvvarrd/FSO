const { blogFinder, tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

const { Blog, User } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.findAll({
			where: req.query.search
				? {
						[Op.or]: [
							{
								title: {
									[Op.iLike]: `%${req.query.search}%`,
								},
							},
							{
								author: {
									[Op.iLike]: `%${req.query.search}%`,
								},
							},
						],
				  }
				: {},
			order: [['likes', 'DESC']],
			attributes: { exclude: ['userId'] },
			include: {
				model: User,
				attributes: ['name'],
			},
		})
		if (blogs) {
			res.json(blogs)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		console.error('Error getting blogs:', error)
		next(error)
	}
})

router.post('/', tokenExtractor, async (req, res, next) => {
	try {
		const blog = await Blog.create({
			...req.body,
			userId: req.user.id,
			date: new Date(),
		})
		res.json(blog)
	} catch (error) {
		console.error('Error creating blog:', error)
		next(error)
	}
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
	try {
		if (!req.blog) {
			res.status(404).end()
		} else if (!req.user || req.user.id !== req.blog.userId) {
			res.status(401).json({ error: 'Unauthorized' })
		} else {
			req.blog.destroy()
			res.status(204).end()
		}
	} catch (error) {
		console.error('Error deleting blog:', error)
		next(error)
	}
})

router.put('/:id', blogFinder, async (req, res, next) => {
	try {
		if (!req.blog) {
			res.status(404).end()
		}
		req.blog.likes = req.body.likes
		await req.blog.save()
		res.json(req.blog)
	} catch (error) {
		console.error('Error updating blog:', error)
		next(error)
	}
})

module.exports = router
