import { validateName, validateSenha, validateEmail } from "./validators";

describe('utils.validators', () => {
  it('validateName - valida retorno "Este campo é obrigatório" caso não seja passado nenhum parâmetro para a função', () => {
    expect(validateName()).toBe('Este campo é obrigatório')
  })

  it('validateName - valida retorno "Nome precisa conter mais que 2 caracteres" caso o parâmetro informado contenha menos de 3 caracteres', () => {
    expect(validateName('mi')).toBe('Nome precisa conter mais que 2 caracteres')
  })

  it('validateName - valida retorno = true caso o parâmetro informado contenha mais de 2 carateres', () => {
    expect(validateName('michel')).toBe(true)
  })

  it('validateSenha -valida retorno "Este campo é obrigatório" caso não seja passado nenhum parâmetro para a função', () => {
    expect(validateSenha()).toBe("Este campo é obrigatório")
  })

  it('validateSenha - valida retorno "Senha precisa conter mais que 2 caracteres" caso o parâmetro informado contenha menos de 3 caracteres', () => {
    expect(validateSenha('se')).toBe('Senha precisa conter mais que 2 caracteres')
  })

  it('validateSenha - valida retorno = true caso o parâmetro informado contenha mais de 2 carateres', () => {
    expect(validateSenha('senha')).toBe(true)
  })

  it('validateEmail -valida retorno "Este campo é obrigatório" caso não seja passado nenhum parâmetro para a função', () => {
    expect(validateEmail()).toBe("Este campo é obrigatório")
  })

  it('validateEmail - valida retorno "Email inválido" caso o parâmetro informado não esteja no "padrão" de e-mail (ex: email@email.com / email@email.com.br)', () => {
    expect(validateEmail('email.abc')).toBe('Email inválido')
  })

  it('validateEmail - valida retorno = true caso o parâmetro informado esteja no "padrão" de e-mail', () => {
    expect(validateEmail('email@email.com')).toBe(true)
  })
})
