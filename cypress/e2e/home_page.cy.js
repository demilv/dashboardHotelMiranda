describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('http://localhost:5173') 
      cy.url().should('include', '/login')      

      const email = "kdeveral0@nifty.com";
      const pass = "1"

      cy.get('input[name=email]').type(`${email}`)
      cy.get('input[name=pass]').type(`${pass}`)
      cy.get('button[type=submit]').click()
      
      cy.url().should('eq', 'http://localhost:5173/')

      cy.get('.navbar__burger').should('be.visible')      
    })
  })