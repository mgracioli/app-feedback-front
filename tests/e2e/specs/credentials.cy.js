const URL_FRONT = process.env.VUE_APP_BASE_URL_FRONT || 'http://localhost:8080'

describe('tests.e2e.specs.cedentials', () => {
  it('Deve re-gerar uma chave de api', () => {
    cy.visit(URL_FRONT)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')
    cy.get('#email-field').type('teste@teste.com')
    cy.get('#password-field').type('123456')
    cy.get('#submit-button').click()
    cy.url().should('include', '/feedbacks')

    cy.wait(4000)
    cy.visit(`${URL_FRONT}/credentials`)
    cy.wait(2000)
    const oldApiKey = cy.get('#apikey').invoke('text')
    cy.get('#generate-apikey').click()
    cy.wait(2000)
    const newApiKey = cy.get('#apikey').invoke('text')

    expect(oldApiKey).to.not.equal(newApiKey)
  })

})
