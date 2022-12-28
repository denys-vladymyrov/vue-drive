<script setup lang="ts">
import {ref} from "vue";

  const file = ref(null)

  const handleClick = () => {
    (file.value! as any).click()
  }


  const emit = defineEmits(['files-chosen'])

  const handleChangeEvent = (event: any) => {
    emit('files-chosen', event.target.files)
    setTimeout(() => {
      event.target.value = ''
    }, 2000)
  }

</script>



<template>
  <button class="btn btn-outline-primary" @click="handleClick">
    <icon-upload /> Upload Files
  </button>
  <input type="file" multiple style="display: none" ref="file" @change="handleChangeEvent">
</template>