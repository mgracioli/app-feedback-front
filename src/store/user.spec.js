import useStore from "@/hooks/useStore"
import { clearCurrentUser, resetUserStore, setApiKey, setCurrentUser } from "./user"

jest.mock('axios')

describe('store.users', () => {
  afterEach(() => {
    resetUserStore()
  })

  it('Deve gravar os dados do usuário atual', async () => {
    const store = useStore()
    setCurrentUser({ name: 'Michel' })

    expect(store.User.currentUser.name).toBe('Michel')
  })

  it('Deve gravar a chave de api para o usuário atual', () => {
    const store = useStore()
    setApiKey('123')

    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('Deve limpar dados do usuário atual', () => {
    const store = useStore()
    setCurrentUser({ name: 'Michel' })
    expect(store.User.currentUser.name).toBe('Michel')

    clearCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})
