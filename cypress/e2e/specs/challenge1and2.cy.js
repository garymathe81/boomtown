/// <reference types="cypress" />

describe('Boomtown Challenges', () => {

  it('Login and Search', () => {

    cy.viewport(1280, 800) // the default 1000x660 wasn't displaying the whole page

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
    // search results take quite a while to return
    
  })

  it('API Authentication and Pagination', () => {

    cy.viewport(1280, 800)

    cy.request(
      {
        method: 'POST', 
        url: 'https://app.preprod.goboomtown.com/api/core/?sAction=userLogin',
        form: true,
        body:{
          email: 'automationchallenge@test.com',
          password: 'FqHYdf#456'
        }
      }
    )
      .then(response => 
        {
          sessionStorage.setItem('session_csrf_token', response.body.csrf_token)
          cy.setCookie('relay', response.headers.sessionid)
          cy.setCookie('dstoken', response.headers.sessionid)

          cy.request(
            {
              method: 'GET', 
              url: 'https://app.preprod.goboomtown.com/api/issues/?sAction=listing&page=1&start=0&limit=10',
              headers:{
                'x-boomtown-csrf-token': response.body.csrf_token
              }
            }
          )
            .then(response => 
              {
                expect(response.body.issues.results).to.have.length(10)
              }
            )
        }
      )
  })
})
