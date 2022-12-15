<script setup lang="ts">
import FileItem from "@/components/files/FileItem.vue";


const props = defineProps({
  files: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <div class="row">
    <FileItem v-for="file in files" :file="file" :key="+file.id" />
  </div>
</template>