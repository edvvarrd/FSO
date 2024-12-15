const { ReadingLists, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
	try {
		await ReadingLists.create(req.body)
		res.status(200).end()
	} catch (error) {
		next(error)
	}
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
	try {
		const readingList = await ReadingLists.findByPk(req.params.id)
		console.log(req.decodedToken.id)
		console.log(readingList.userId)
		if (!readingList) {
			res.status(404).end()
		}
		if (!req.decodedToken || req.decodedToken.id !== readingList.userId) {
			return res.status(401).json({ error: 'Unauthorized' })
		}
		readingList.read = req.body.read
		await readingList.save()
		res.status(200).end()
	} catch (error) {
		next(error)
	}
})

module.exports = router
