const { User, Blog, Token } = require('../models')

const jwt = require('jsonwebtoken')

const { SECRET } = require('./config')

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id)

	next()
}

const tokenExtractor = async (req, res, next) => {
	const authorization = req.get('authorization')
	if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
		return res.status(401).json({ error: 'token invalid' })
	}
	const token = authorization.substring(7)

	const tokenSession = await Token.findByPk(token)

	if (!tokenSession) {
		return res.status(401).json({ error: 'token expired' })
	}

	const decodedToken = jwt.verify(token, SECRET)

	if (!decodedToken) {
		return res.status(401).json({ error: 'token invalid' })
	}

	const user = await User.findByPk(decodedToken.id)

	if (!user || user.disabled) {
		return res.status(401).json({ error: 'user disabled' })
	}

	req.user = user

	next()
}

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	switch (error.name) {
		case 'SequelizeDatabaseError':
			return res.status(400).send({ error: 'Database error.' })
		case 'SequelizeValidationError':
			const errors = error.errors.map(error => error.message)

			return res.status(400).json({ error: errors })
		default:
			return res.status(500).send({ error: 'Unrecognized error.' })
	}
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
	blogFinder,
	tokenExtractor,
	errorHandler,
	unknownEndpoint,
}
