import { reactive } from 'vue'

const userInitialState = {
  currentUser: {}
}

// estados globais do usuário
let state = reactive(userInitialState)

export default state

export function resetUserStore () {
  state = reactive(userInitialState)
}

export const clearCurrentUser = () => {
  state.currentUser = {}
}

export const setCurrentUser = (user) => {
  state.currentUser = user
}

export const setApiKey = (apiKey) => {
  const currentUser = { ...state.currentUser, apiKey }
  state.currentUser = currentUser
}
