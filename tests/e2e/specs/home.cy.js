const URL_FRONT = process.env.VUE_APP_BASE_URL_FRONT || 'http://localhost:8080'
describe('Home', () => {
  it('Deve renderizar o modal de criar conta (ModalCreateAccount) quando clicado no botão cta "Crie sua conta"', () => {
    cy.visit(URL_FRONT)
    cy.get('#cta-create-account-button').click()
    cy.get('#modal-create-account')
  })

  it('Deve renderizar o modal de criar conta (ModalCreateAccount) quando clicado no botão header "Crie sua conta"', () => {
    cy.visit(URL_FRONT)
    cy.get('#header-create-account-button').click()
    cy.get('#modal-create-account')
  })

  it('Deve renderizar o modal de login (ModalLogin) quando clicado no botão header "Login"', () => {
    cy.visit(URL_FRONT)
    cy.get('#header-login-button').click()
    cy.get('#login-create-account')
  })
})
