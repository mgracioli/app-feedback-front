<template>
  <div id="modal-create-account" class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Crie uma conta
    </h1>

    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>

        <input v-model="state.name.value" type="text"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-red-400': !!state.name.errorMessage }">

        <span v-if="!!state.name.errorMessage" class="block font-medium text-brand-danger">
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>

        <input v-model="state.email.value" type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-red-400': !!state.email.errorMessage }">

        <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>

        <input v-model="state.password.value" type="password"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-red-400': !!state.password.errorMessage }">

        <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button type="submit" :class="{ 'opacity-50': state.isLoading }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        :disabled="state.isLoading">
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>
          Entrar
        </span>
      </button>
    </form>
  </div>
</template>

<script>

import useModal from '@/hooks/useModal'
import { reactive, watch } from 'vue'
import { useField } from 'vee-validate'
import { validateName, validateSenha, validateEmail } from '../../utils/validators'
import services from '../../services'
import Icon from '../Icon'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  components: {
    Icon
  },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateName)

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateSenha)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      }
    })

    watch(state.name.value, () => {
      console.log(state.name.value)
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
        state.isLoading = false
        return
      }

      switch (errors.status) {
        case 400:
          toast.error('Erro ao realizar login')
          break
        case 401:
          toast.error('E-mail ou senha inválidos')
          break
        case 404:
          toast.error('E-mail não localizado')
          break
      }

      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()

        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          try {
            await login({
              email: state.email.value,
              password: state.password.value
            })

            toast.success('Conta criada com sucesso')
            return
          } catch {
            toast.error('Erro ao realizar login, tente entrar novamente')
          }
        }

        switch (errors.status) {
          case 400:
            toast.error('Erro ao criar conta')
            break
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Erro ao criar conta')
        toast.error('aqui')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
