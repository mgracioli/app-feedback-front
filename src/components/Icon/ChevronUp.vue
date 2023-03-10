<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10" :fill="color" :height="size" :width="size">
    <g transform="matrix(-1 0 0 -1 17 10)">
      <path d="M1.9975 0L8.5 6.18084L15.0025 0L17 1.90283L8.5 10L0 1.90283L1.9975 0Z" fill="#7E7E7E" />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    size: { type: [String, Number], default: 22 },
    color: { type: String, default: 'white' }
  }
}
</script>
