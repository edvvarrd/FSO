const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Token } = require('../models')

router.post('/', async (req, res, next) => {
	try {
		const body = req.body

		const user = await User.findOne({
			where: {
				username: body.username,
			},
		})

		const passwordCorrect = body.password === 'secret'

		if (!(user && passwordCorrect)) {
			return res.status(401).json({
				error: 'invalid username or password',
			})
		}

		const userForToken = {
			username: user.username,
			id: user.id,
		}

		const token = jwt.sign(userForToken, SECRET)
		await Token.create({ session: token })
		res.status(200).send({ token, username: user.username, name: user.name })
	} catch (error) {
		next(error)
	}
})

module.exports = router
