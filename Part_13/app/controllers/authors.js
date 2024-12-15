const router = require('express').Router()

const { sequelize } = require('../util/db')
const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
	try {
		const authors = await Blog.findAll({
			attributes: ['author', [sequelize.fn('SUM', sequelize.col('likes')), 'likes'], [sequelize.fn('COUNT', sequelize.col('id')), 'articles']],
			group: 'author',
			order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
		})
		if (authors) {
			res.json(authors)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
