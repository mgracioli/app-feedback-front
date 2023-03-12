import mockAxios from 'axios'
import AuthService from './auth'

jest.mock('axios')

describe('services.auth', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Deve retornar um token ao efetuar login no sistema', async () => {
    const token = '123.123.123'

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({ email: 'teste@teste.com.br', password: '123456' })

    expect(response.data).toHaveProperty('token')
    expect(response.data).toMatchSnapshot() //snapshot: o jest cria um arquivo e compara esse arquivo sempre q esse teste for rodado, caso a response do teste seja diferente do que está no arquivo o teste falha
  })

  it('Deve retornar um usuário ao efetuar login no istema', async () => {
    const user = {
      name: 'teste',
      password: '123456',
      email: 'teste@teste.com.br',
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { user } })
    })

    const response = await AuthService(mockAxios).register(user)

    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')
    expect(response.data).toMatchSnapshot()
  })

  it('Deve retornar erro de "Not found" quando não houver conexão', async () => {
    const erros = {status: 404, statusText: 'Not found'}

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: erros })
    })

    const response = await AuthService(mockAxios).register(user)

    expect(response.errors).toHaveProperty('status')
    expect(response.data).toHaveProperty('statustext')
  })
})
