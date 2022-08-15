/// <reference types="cypress" />

describe('Search Box functionality', () => {

    it('Search results', () => {
  
      cy.viewport(1280, 800) 
  
      cy.visit('https://help.goboomtown.com/')
          
      cy.get('#hero_search').type('customer{enter}')
      cy.get('#kb-search-title', {timeout: 8000}).should('be.visible').and('contain','39 results for "customer"')
      cy.get('.search-results').find('li').its('length').should('be.gte', 0)
      cy.get('#hero_search').clear()

      cy.get('#hero_search').type('stuff{enter}')
      cy.get('#kb-search-title', {timeout: 8000}).should('be.visible').and('contain','0 results for "stuff"')
      
    })
})