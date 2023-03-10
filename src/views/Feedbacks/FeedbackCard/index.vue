<template>
  <div @click="handleToggle" class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray">
    <div class="flex items-center justify-between w-full mg-8">
      <badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="font-regular text-gray-800 mt-5">
      {{ feedback.text }}
    </div>

    <div :class="{ animate__fadeOut: state.isClosing }" v-if="state.isOpen"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster separator">

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-regular text-gray-400 uppercase select-none">Página</span>
          <span class="font-regular text-gray-700">{{ feedback.page }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-regular text-gray-400 uppercase select-none">Dispositivo</span>
          <span class="font-regular text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-regular text-gray-400 uppercase select-none">usuário</span>
          <span class="text-lg font-regular text-gray-700">{{ feedback.fingerprint }}</span>
        </div>
      </div>
    </div>

    <div v-if="!state.isOpen" class="flex justify-end">
      <icon name="chevron-down" size="16" :color="brandColors.grayDark" />
    </div>
    <div v-else class="flex justify-end">
      <icon name="chevron-up" size="16" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import Badge from './Badge'
import { getDiffTimeBetweenCurrentDate } from '../../../utils/date'
import palette from '../../../../palette'
import { reactive } from 'vue'
import Icon from '../../../components/Icon'
import { wait } from '../../../utils/timeout'

export default {
  components: {
    Badge,
    Icon
  },

  props: {
    feedback: {
      type: Object,
      required: true
    },
    isOpened: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })

    async function handleToggle () {
      state.isClosing = true
      await wait(250)
      state.isOpen = !state.isOpen
      state.isClosing = false
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    }
  }
}
</script>

<style lang="postcss" scoped>
.separator::before {
  content: "";
  width: 100%;
  height: 1px;
  border: 1px solid #cfcfcf;
  position: absolute;
  top: -17px
}
</style>
