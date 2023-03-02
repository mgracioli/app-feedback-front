import axios from 'axios'
import AuthService from './auth'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

httpClient.interceptors.response.use((response) => response, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500

  if (canThrowAnError) {
    throw new Error(error.message)
  }

  return error
})

export default {
  auth: AuthService(httpClient)
}
