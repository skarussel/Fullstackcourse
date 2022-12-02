describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Peter Paul',
      username: 'ppersönlich',
      password: 'trampolin'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login Form is shown', function() {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('ppersönlich')
      cy.get('#password').type('trampolin')
      cy.get('#login-button').click()

      cy.contains('Login Succesful')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ppersönlich')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials. Login Failed')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('ppersönlich')
      cy.get('#password').type('trampolin')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#newBlogButton').click()
      cy.get('#title').type('Was ein Jahr')
      cy.get('#author').type('Peter Pan')
      cy.get('#url').type('www.test.de')
      cy.get('#addBlog').click()
      cy.contains('view').click()
      cy.contains('Was ein Jahr')
      cy.contains('www.test.de')
    })
    describe('When a blog exist', function() {
      beforeEach(function() {
      cy.get('#newBlogButton').click()
      cy.get('#title').type('Was ein Jahr')
      cy.get('#author').type('Peter Pan')
      cy.get('#url').type('www.test.de')
      cy.get('#addBlog').click()
      cy.contains('view').click()
      })

    it('A blog can be liked', function(){
      
      cy.contains('Like').click()
      cy.get("#numLikes").invoke("text").should("eq", "1 Like"); 

    })

    it('A blog can be removed', function(){
      
      cy.contains('Remove').click()
      cy.contains("Was ein Jahr") 

    })

    it('Blogs are ordered', function(){
      cy.get('#title').type('Petrus der zweite')
      cy.get('#author').type('Peter Pan')
      cy.get('#url').type('www.test.de')
      cy.get('#addBlog').click()
      console.log(cy.get('#blog'))
     
      
      cy.get('.blog').eq(0).should('contain', 'Petrus der zweite')
      cy.get('.blog').eq(1).should('contain', 'Was ein Jahr')  
    })

  })
  })
})