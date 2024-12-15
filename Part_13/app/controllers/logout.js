const router = require('express').Router()

const { Token } = require('../models')

router.delete('/', async (req, res, next) => {
	const authorization = req.get('authorization')
	if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
		res.status(204).end()
	}
	const token = authorization.substring(7)

	if (!token) {
		res.status(204).end()
	}

	const tokenSession = await Token.findByPk(token)

	if (tokenSession) {
		await tokenSession.destroy()
	}

	res.status(204).end()
})

module.exports = router
