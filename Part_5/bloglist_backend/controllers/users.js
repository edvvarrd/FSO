const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (password.length >= 3) {
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(password, saltRounds)

		const user = new User({
			username,
			name,
			passwordHash,
		})

		const savedUser = await user.save()

		response.status(201).json(savedUser)
	} else if (!password) {
		response.status(400).json({
			error: 'User validation failed: password: password is required.',
		})
	} else {
		response.status(400).json({
			error: 'User validation failed: password: password is too short.',
		})
	}
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { user: 0 })
	response.json(users)
})

module.exports = usersRouter
