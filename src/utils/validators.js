export function validateName (value) {
  if (!value) {
    return 'Este campo é obrigatório'
  }

  if (value.length < 3) {
    return 'Nome precisa conter mais que 2 caracteres'
  }

  return true
}

export function validateSenha (value) {
  if (!value) {
    return 'Este campo é obrigatório'
  }

  if (value.length < 3) {
    return 'Senha precisa conter mais que 2 caracteres'
  }

  return true
}

export function validateEmail (value) {
  if (!value) {
    return 'Este campo é obrigatório'
  }

  const emailValid = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/i.test(value)

  if (!emailValid) {
    return 'Email inválido'
  }

  return true
}
