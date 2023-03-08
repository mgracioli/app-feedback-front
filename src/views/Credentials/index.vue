<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col items-center w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg text-center text-gray-800 font-regular">
        Esta aqui é a sua chave de api
      </p>

      <content-loader v-if="store.Global.isLoading || state.isLoading" class="rounded" width="450px" height="50px" />
      <div v-else class="flex py-3 pl-5 pr-5 mt-2 rounded items-center bg-brand-gray">
        <span v-if="state.hasError">Erro ao carregar a api key</span>

        <span v-else>{{ store.User.currentUser.apiKey }}</span>

        <div v-if="!state.hasError" class="flex ml-10">
          <icon @click="handleCopy" name="copy" :color="brandColors.graydark" size="24" class="cursor-pointer" />

          <icon @click="handleGenerateApiKey" name="loading" :color="brandColors.graydark" size="24"
            class="cursor-pointer ml-3" />
        </div>
      </div>

      <p class="mt-5 text-lg text-center text-gray-800 font-regular">
        Adicione o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader v-if="store.Global.isLoading || state.isLoading" class="rounded" width="600px" height="50px" />
      <div v-else class="py-3 pl-5 pr-5 mt-2 rounded bg-brand-gray w-4/5 overflow-x-scroll">
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre
          v-else>&lt;script src="http://mgracioli-app-feedback-widget.netlify.app?apiKey={{ store.User.currentUser.apiKey }}"&gt;&lt;/script&gt;</pre>
      </div>
    </div>
  </div>
</template>

<script>
import useStore from '@/hooks/useStore'
import HeaderLogged from '../../components/HeaderLogged'
import palette from '../../../palette'
import Icon from '../../components/Icon'
import ContentLoader from '../../components/ContentLoader'
import { reactive, watch } from 'vue'
import services from '@/services'
import { setApiKey } from '@/store/user'
import { useToast } from 'vue-toastification'

export default {
  components: {
    HeaderLogged,
    Icon,
    ContentLoader
  },

  setup () {
    const toast = useToast()
    const store = useStore()
    const state = reactive({
      hasError: false,
      isLoading: false
    })

    watch(() => store.Global.isLoading, () => {
      if (!store.User.currentuser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error) {
      state.hasError = !!error
      state.isLoading = false
    }

    async function handleCopy () {
      toast.clear()

      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true

        const { data } = await services.users.generateApiKey()
        setApiKey(data.apiKey)

        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return {
      store,
      brandColors: palette.brand,
      state,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
