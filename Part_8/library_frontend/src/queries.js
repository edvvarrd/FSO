import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			bookCount
			born
			id
		}
	}
`

export const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
			born
		}
		published
		genres
		id
	}
`

export const ALL_BOOKS = gql`
	${BOOK_DETAILS}

	query ($genre: String) {
		allBooks(genre: $genre) {
			...BookDetails
		}
	}
`

export const ALL_GENRES = gql`
	query {
		allBooks {
			genres
		}
	}
`

export const USER = gql`
	query {
		me {
			username
			favoriteGenre
			id
		}
	}
`

export const ADD_BOOK = gql`
	${BOOK_DETAILS}

	mutation addBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const BOOK_ADDED = gql`
	${BOOK_DETAILS}

	subscription {
		bookAdded {
			...BookDetails
		}
	}
`
