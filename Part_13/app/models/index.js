const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./readingList')
const Token = require('./token')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readingList' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'markedByUsers' })

module.exports = {
	Blog,
	User,
	ReadingLists,
	Token,
}
