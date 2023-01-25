<template>
  <div class="upload-controls">
    {{ item.progress }}
    <button @click="emit('cancel')">c</button>
    <button @click="emit('retry')">r</button>
    <button @click="emit('locate')">l</button>
  </div>
</template>


<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object,
      default: 0
    }
  })

  const emit = defineEmits(['cancel', 'retry', 'locate'])


</script>