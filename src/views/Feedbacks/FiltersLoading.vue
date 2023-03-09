<template>
  <div class="flex flex-col rounded" width="100%" height="300px">
    <h1 class="text-2xl mt-1 font-regular text-brand-dark-gray">
      Filtros
    </h1>
    <content-loader class="mt-3 rounded" width="100%" height="28px" animation-duration="2s" />
    <content-loader class="mt-3 rounded" width="100%" height="28px" animation-duration="2s" />
    <content-loader class="mt-3 rounded" width="100%" height="28px" animation-duration="2s" />
    <content-loader class="mt-3 rounded" width="100%" height="28px" animation-duration="2s" />
  </div>
</template>

<script>
import ContentLoader from '../../components/ContentLoader'

export default {
  components: {
    ContentLoader
  }
}
</script>
