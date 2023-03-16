const URL_FRONT = process.env.VUE_APP_BASE_URL_FRONT || 'http://localhost:8080'

describe('tests.e2e.specs.Home', () => {
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
    cy.get('#modal-login')
  })

   it('Deve realizar o login quando os dados informados forem corretos', () => {
    cy.visit(URL_FRONT)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')
    cy.get('#email-field').type('teste@teste.com')
    cy.get('#password-field').type('123456')
    cy.get('#submit-button').click()
    cy.url().should('include', '/feedbacks')
  })

  it('Deve retornar erro quando o email informado for inválido', () => {
    cy.visit(URL_FRONT)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')
    cy.get('#email-field').type('email@invalido.c')
    cy.get('#password-field').type('123456')
    cy.get('#submit-button').click()

    cy.get('#email-error')
  })

  it('Deve realizar o logout do usuário ao clicar no botão "sair"', () => {
    cy.visit(URL_FRONT)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')
    cy.get('#email-field').type('teste@teste.com')
    cy.get('#password-field').type('123456')
    cy.get('#submit-button').click()
    cy.url().should('include', '/feedbacks')

    cy.get('#logout-button').click()
    cy.url().should('include', '/')
  })
})
