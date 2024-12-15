const router = require('express').Router()

const { Op } = require('sequelize')
const { User, Blog, ReadingLists } = require('../models')

router.get('/', async (req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog,
			attributes: { exclude: ['userId'] },
		},
	})
	res.json(users)
})

router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body)
		res.json(user)
	} catch (error) {
		console.error(error)
		next(error)
	}
})

router.get('/:id', async (req, res) => {
	let query
	switch (req.query.read) {
		case 'true':
			query = true
			break
		case 'false':
			query = false
			break
		default:
			query = undefined
	}

	const user = await User.findByPk(req.params.id, {
		include: [
			{
				model: Blog,
				as: 'blogs',
				attributes: { exclude: ['userId'] },
			},
			{
				model: Blog,
				as: 'readingList',
				attributes: { exclude: ['userId'] },
				through: {
					attributes: ['read'],
					where: query !== undefined ? { read: query } : undefined,
				},
			},
		],
	})
	if (!user) {
		res.status(404).end()
	}
	res.json(user)
})

router.put('/:username', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { username: req.params.username },
		})
		if (!user) {
			res.status(404).end()
		}
		user.username = req.body.username
		await user.save()
		res.json(user)
	} catch (error) {
		console.error(error)
		next(error)
	}
})

module.exports = router
