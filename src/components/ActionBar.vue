<script setup lang="ts">
import FileChooser from "@/components/uploader/file-chooser/FileChooser.vue";

const props = defineProps({
  selectedCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['rename', 'remove', 'files-chosen'])


</script>


<template>
  <div
      class="
      d-flex
      justify-content-between
      align-items-center
      border-bottom
      pt-2
      pb-3
    "
  >

    <FileChooser @files-chosen="emit('files-chosen', $event)"/>

    <div class="action-buttons" v-show="selectedCount">
      <button
          type="button"
          class="rounded-button"
          title="Rename" v-if="selectedCount === 1"
          @click="emit('rename')"
      >
        <icon-pencil/>
      </button>
      <button
          type="button"
          class="rounded-button"
          title="Remove selected"
          @click="emit('remove')"
      >
        <icon-trash/>
      </button>
    </div>
  </div>
</template>
