import { reactive } from 'vue'

// estados globais do usuário
const state = reactive({
  currentUser: {}
})

export default state

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
