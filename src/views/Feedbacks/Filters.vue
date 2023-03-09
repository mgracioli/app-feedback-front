<template>
  <div class="flex flex-col">
    <h1 class="text-2xl mt-5 font-regular text-brand-dark-gray">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li v-for="filter in state.filters" :key="filter.label" :class="{ 'bg-gray-200 bg-opacity-50': filter.active }"
        @click="() => handleSelect(filter)" class="flex items-center justify-between px-4 py-1 rounded cursor-pointer">
        <div class="flex items-center">
          <span :class="`bg-${filter.color}`" class="inline-block w-2 h-2 mr-2 rounded-full"></span>

          {{ filter.label }}
        </div>

        <span :class="filter.active ? `text-${filter.color}` : 'text-brand-graydark'" class="font-bold">
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
import services from '@/services'
import useStore from '@/hooks/useStore'

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const COLORS = {
  all: 'brand-info',
  issue: 'brand-danger',
  idea: 'brand-warning',
  other: 'brand-graydark'
}

function applyFilterStructure (summary) {
  return Object.keys(summary).reduce((acc, curr) => {
    const currentFilter = {
      label: LABELS[curr],
      color: COLORS[curr],
      amount: summary[curr]
    }

    if (curr === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = curr
    }

    return [...acc, currentFilter]
  }, [])
}

export default {
  async setup (_, { emit }) {
    const store = useStore('Global')
    const state = reactive({
      hasError: false,
      filters: [{
        label: null,
        amount: null
      }]
    })

    try {
      const { data } = await services.feedbacks.getSummary()

      console.log('data', data)
      state.filters = applyFilterStructure(data)
    } catch (error) {
      state.hasError = !!error
      state.filters = applyFilterStructure({ all: 0, issue: 0, idea: 0, other: 0 })

      console.log('errroo')
    }

    function handleSelect ({ type }) {
      if (store.isLoading) {
        console.log('isloading')
        return
      }

      state.filters = state.filters.map((filter) => {
        if (filter.type === type) {
          return { ...filter, active: true }
        } else {
          return { ...filter, active: false }
        }
      })

      emit('select', type)
    }

    return {
      state,
      handleSelect
    }
  }
}
</script>
