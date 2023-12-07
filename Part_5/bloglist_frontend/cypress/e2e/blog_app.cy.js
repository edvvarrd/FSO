describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users', {
			username: 'testcy',
			name: 'testcy',
			password: 'testcy',
		})
		cy.visit('http://localhost:5173')
	})
	it('Login form is shown', function () {
		cy.contains('log in to application').should('be.visible')
		cy.get('#username').should('be.visible')
		cy.get('#password').should('be.visible')
		cy.get('#login').should('be.visible')
	})
	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('testcy')
			cy.get('#password').type('testcy')
			cy.get('#login').click()

			cy.get('.popup')
				.should('be.visible')
				.and('contain', 'testcy logged in')
				.and('have.css', 'color', 'rgb(0, 128, 0)')
		})
		it('fails with incorrect credentials', function () {
			cy.get('#username').type('testcy')
			cy.get('#password').type('wrong')
			cy.get('#login').click()

			cy.get('.popup')
				.should('be.visible')
				.and('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})
	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'testcy', password: 'testcy' })
		})
		it('A blog can be created', function () {
			cy.contains('create new blog').click()

			cy.get('#title').type('testcy')
			cy.get('#author').type('testcy')
			cy.get('#url').type('testcy')
			cy.get('#createBlog').click()

			cy.reload()

			cy.get('.blog').should('contain', 'testcy by testcy')
		})
		describe('Added blog', function () {
			beforeEach(function () {
				cy.addBlog({ title: 'testcy', author: 'testcy', url: 'testcy' })
			})
			it('Can be liked', function () {
				cy.get('.blog')
					.within(() => {
						cy.contains('show').click()
						cy.contains('like').click()
					})
					.should('contain', 'likes: 1')
			})
			it('Can be deleted', function () {
				cy.get('.blog').within(() => {
					cy.contains('show').click()
					cy.contains('remove').click()
					cy.on('window:confirm', () => true)
				})

				cy.get('.blog').should('not.exist')
			})
			it('Shows remove button only to its creator', function () {
				cy.get('.blog')
					.within(() => {
						cy.contains('show').click()
					})
					.should('contain', 'remove')

				cy.contains('logout').click()

				cy.request('POST', 'http://localhost:3003/api/users', {
					username: 'testcy2',
					name: 'testcy2',
					password: 'testcy2',
				})

				cy.login({ username: 'testcy2', password: 'testcy2' })

				cy.get('.blog').within(() => {
					cy.contains('show').click()
					cy.contains('remove').should('not.visible')
				})
			})
			it('Is shown within the order of number of likes', function () {
				cy.addBlog({ title: 'testcy2', author: 'testcy2', url: 'testcy2' })

				cy.get('.blog').eq(0).should('contain', 'testcy by testcy')

				cy.get('.blog')
					.eq(1)
					.within(() => {
						cy.contains('show').click()
						cy.contains('like').click()
					})

				cy.get('.blog').eq(0).should('contain', 'testcy2 by testcy2')
			})
		})
	})
})
