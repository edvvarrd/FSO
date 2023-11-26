Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username,
		password,
	}).then(({ body }) => {
		localStorage.setItem('loggedUser', JSON.stringify(body))
		cy.reload()
	})
})
Cypress.Commands.add('addBlog', ({ title, author, url }) => {
	cy.request({
		url: 'http://localhost:3003/api/blogs',
		method: 'POST',
		body: { title, author, url },
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem('loggedUser')).token
			}`,
		},
	})
	cy.reload()
})
