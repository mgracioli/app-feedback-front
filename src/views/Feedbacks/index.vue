<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos
    </p>
  </div>

  <div class="flex justify-center w-full pb-20 ">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-dark-gray">
          Listagem
        </h1>

        <!-- <Suspense> is a built-in component for orchestrating async dependencies in a component tree. It can render a loading state while waiting for multiple nested async dependencies down the component tree to be resolved. -->
        <suspense>
          <template #default>
            <!-- @ é o mesmo que "on": @select = onSelect -->
            <filters @select="changeFeedbacksType" class="mt-8 animate__animated animate__fadeIn animate__faster" />
          </template>

          <template #fallback>
            <filters-loading class="mt-12" />
          </template>
        </suspense>
      </div>

      <div class="col-span-3 px-10 pt-20">
        <p v-if="state.hasError" class="text-lg text-center text-gray-800 font-regular">
          Erro ao carregar os feedbacks 😕
        </p>

        <p v-if="state.feedbacks.lenght && !state.isLoading && !state.isLoadingFeedbacks && !state.hasError"
          class="text-lg text-center text-gray-800 font-regular">
          Nenhum feedback encontrado
        </p>

        <feedback-card-loading v-if="state.isLoading || state.isLoadingFeedbacks" />
        <feedback-card v-else v-for="(feedback, index) in state.feedbacks" :key="feedback.id" :is-opened="index === 0"
          :feedback="feedback" class="mb-8" />
        <feedback-card-loading v-if="state.isloadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onUnmounted, onErrorCaptured } from 'vue'
import HeaderLogged from '../../components/HeaderLogged'
import Filters from './Filters'
import FiltersLoading from './FiltersLoading'
import FeedbackCard from './FeedbackCard'
import FeedbackCardLoading from './FeedbackCard/FeedbackCardLoading'
import services from '@/services'

export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },

  setup () {
    const state = reactive({
      isLoading: false,
      isLoadingFeedbacks: false,
      isloadingMoreFeedbacks: false,
      feedbacks: [],
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0
      },
      hasError: false
    })

    onMounted(() => {
      fetchFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    // captura erros em componentes filhos
    onErrorCaptured(handleErrors)

    function handleErrors (error) {
      state.isLoading = false
      state.isLoadingFeedbacks = false
      state.isloadingMoreFeedbacks = false
      state.hasError = !!error
    }

    async function handleScroll () {
      const isBottomOfWindow = Math.ceil(document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight

      if ((state.isLoading) ||
        (state.isloadingMoreFeedbacks) ||
        (!isBottomOfWindow) ||
        (state.feedbacks.length >= state.pagination.total)) {
        return
      }

      try {
        state.isloadingMoreFeedbacks = true

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: (state.pagination.offset + 5)
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }

        state.pagination = data.pagination
      } catch (error) {
        console.log('aqui2')

        handleErrors(error)
      } finally {
        state.isloadingMoreFeedbacks = false
      }
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination

        state.isLoading = false
      } catch (error) {
        handleErrors(error)
      }
    }

    async function changeFeedbacksType (type) {
      try {
        state.isLoadingFeedbacks = true
        state.pagination.limit = 5
        state.pagination.offset = 0
        state.currentFeedbackType = type

        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoadingFeedbacks = false
      } catch (error) {
        handleErrors(error)
      }
    }

    return {
      state,
      changeFeedbacksType
    }
  }
}
</script>
