<template>
  <div class="flex flex-col items-center round" width="100%" height="300px">
    <content-loader class="mt-3 rounded" width="90%" height="90px" animation-duration="2s" />
    <content-loader class="mt-3 rounded" width="90%" height="90px" animation-duration="2s" />
    <content-loader class="mt-3 rounded" width="90%" height="90px" animation-duration="2s" />
  </div>
</template>

<script>
import ContentLoader from '../../../components/ContentLoader'

export default {
  components: {
    ContentLoader
  }
}
</script>
