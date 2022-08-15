/// <reference types="cypress" />

describe('CXME Overview', () => {

    const baseUrl = 'https://help.goboomtown.com'

    it('Link response', () => {

        cy.viewport(1280, 800) 
  
        cy.visit(baseUrl)

        // the block below can be turned into a utility with 'CXME' replaced with a variable and used for all tiles on the page  
        cy.get('a').contains('CXME').parent().parent().parent()
            .invoke('attr', 'href')
                .then((href) => {
                    cy.visit(baseUrl+href)
                    cy.url().should('include', href)
                })

        cy.get('.sub-page-title').should('include.text', 'CXME')

    })
})