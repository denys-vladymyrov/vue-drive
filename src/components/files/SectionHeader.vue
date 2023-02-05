<template>
  <div class="d-flex justify-content-between align-items-center py-2">
    <h6 class="text-muted mb-0">{{ title }}</h6>
    <SortToggler @sort-change="emit('sort-change', $event)" v-if="sortToggler" />
  </div>
</template>


<script setup lang="ts">
import SortToggler from "@/components/files/SortToggler.vue"

  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    sortToggler: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['sort-change'])
</script>