<script setup lang="ts">
  import DropZoneMessage from "@/components/uploader/file-chooser/DropZoneMessage.vue"
  import {ref} from "vue"

  const props = defineProps({
    showMessage: {
      type: Boolean,
      default: false
    }
  })

  const dragged = ref(false)


  const handleDrop = (event: DragEvent) => {
    dragged.value = false
    emit('files-dropped', event.dataTransfer!.files)
  }

  const emit = defineEmits(['files-dropped'])


</script>


<template>
  <div
      class="dropzone"
      @dragover.prevent="dragged = true"
      @dragleave.prevent="dragged = false"
      @drop.prevent="handleDrop"
      :class="{'dragged-over': dragged}"
  >
    <DropZoneMessage v-show ="showMessage" />
    <slot />
  </div>
</template>

<style scoped>
  .dropzone {
    min-height: 80vh;
    border: 2px solid #fff;
    background-color: #fff;
    padding: 0.3em;
  }

  .dragged-over {
    background-color: #e8f0fe;
    border: 2px solid #4285f4;
  }

</style>