<script setup lang="ts">
import {ref} from "vue";

const file = ref(null)

const handleClick = () => {
  (file.value! as any).click()
}


const emit = defineEmits(['files-chosen'])

</script>



<template>
  <button class="btn btn-outline-primary" @click="handleClick">
    <icon-upload /> Upload Files
  </button>
  <input type="file" multiple style="display: none" ref="file" @change="emit('files-chosen', $event.target.files)">
</template>