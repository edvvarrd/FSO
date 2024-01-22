const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')

const Author = require('./models/Author')
const Book = require('./models/Book')

const resolvers = {
	Author: {
		bookCount: async root => {
			const searchedAuthor = await Author.findOne({ name: root.name })
			const authorsBooks = await Book.find({ author: searchedAuthor })
			return authorsBooks.length
		},
	},
	Book: {
		author: async root => {
			return Author.findOne({ _id: root.author })
		},
	},
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!(args.author || args.genre)) {
				return Book.find({})
			}
			let filteredBooks
			if (args.author) {
				const searchedAuthor = await Author.findOne({ name: args.author })
				filteredBooks = await Book.find({ author: searchedAuthor })
			}
			if (args.genre) {
				filteredBooks = await Book.find({ genres: args.genre })
			}
			return filteredBooks
		},
		allAuthors: async () => Author.find({}),
		me: (root, args, { currentUser }) => {
			return currentUser
		},
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: { code: 'BAD_USER_INPUT' },
				})
			}

			let author = await Author.findOne({ name: args.author })

			if (!author) {
				author = new Author({ name: args.author })
				try {
					await author.save()
				} catch (error) {
					throw new GraphQLError('Saving author failed', {
						extensions: 'BAD_AUTHOR_INPUT',
						invalidArgs: args.author,
						error,
					})
				}
			}

			const book = new Book({ ...args, author: author })

			try {
				await book.save()
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: 'BAD_BOOK_INPUT',
					invalidArgs: args,
					error,
				})
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: book })

			return book
		},
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: { code: 'BAD_USER_INPUT' },
				})
			}

			const author = await Author.findOne({ name: args.name })

			if (!author) {
				return null
			}

			author.born = args.setBornTo

			return author.save()
		},
		createUser: async (root, args) => {
			const user = new User({ ...args })
			return user.save().catch(error => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args,
						error,
					},
				})
			})
		},
		login: async (root, args) => {
			const user = User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}
			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
}

module.exports = resolvers
