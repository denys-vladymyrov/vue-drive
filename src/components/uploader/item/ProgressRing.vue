<template>
  <svg :height="radius * 2" :width="radius * 2">
    <circle stroke="#ccc" :stroke-width="strokeWidth" fill="transparent" :cx="radius" :cy="radius" :r="normalizedRadius" />
    <circle class="progress-ring" stroke="#3881ff" :stroke-width="strokeWidth" fill="transparent" :cx="radius" :cy="radius"
            :r="normalizedRadius" :stroke-dasharray="`${circumference} ${circumference}`"  :stroke-dashoffset="strokeDashoffset" />
  </svg>
</template>


<script setup lang="ts">
  import {computed} from "vue";

  const props = defineProps({
    radius: {
      type: Number,
      default: 16
    },
    strokeWidth: {
      type: Number,
      default: 3
    },
    progress: {
      type: Number,
      default: 0
    }
  })

  const normalizedRadius = computed(() => {
    return props.radius - props.strokeWidth * 2
  })

  const circumference = computed(() => {
    return normalizedRadius.value * 2 * Math.PI
  })

  const strokeDashoffset = computed(() => {
    return circumference.value - (props.progress / 100) * circumference.value
  })
</script>

<style scoped lang="scss">
  .progress-ring {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>