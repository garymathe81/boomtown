/// <reference types="cypress" />

describe('Boomtown Challenge', () => {

    it('log in and search', () => {
  
      cy.visit('https://help.goboomtown.com/')
      cy.get('.header-link.login').click()
      cy.get('#ext-element-346', {timeout: 15000}) // login page takes a long time to load (large scripts?)
        .type('TestQA1@testqa.com')
      cy.get('#ext-element-372').click()
      cy.get('#ext-element-359')
        .type('TestQA1!')
      cy.get('#ext-element-383').click()
      cy.get('.header-link.logout').should('be.visible') // verifies user is logged in
    
      cy.get('#hero_search').type('customer{enter}')
      cy.get('#kb-search-title', {timeout: 8000}).should('be.visible').and('contain','results for "customer"') 
      // search results take quite a while to display
      
    })
  
  })