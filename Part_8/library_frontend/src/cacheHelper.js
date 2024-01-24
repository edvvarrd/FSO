export const updateCacheBooks = (cache, query, addedBook) => {
	const uniqByTitle = a => {
		let seen = new Set()
		return a.filter(item => {
			let k = item.title
			return seen.has(k) ? false : seen.add(k)
		})
	}

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByTitle(allBooks.concat(addedBook)),
		}
	})
}

export const updateCacheGenres = (cache, query, addedBook) => {
	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: allBooks.concat(addedBook),
		}
	})
}
