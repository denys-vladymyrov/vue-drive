<script setup lang="ts">
import IconChevronDown from "@/components/icons/IconChevronDown.vue"
import IconTimes from "@/components/icons/IconTimes.vue"
import states from "@/components/uploader/states";
import {ref, watch} from "vue";

  const props = defineProps({
    files: {
      type: Object,
      required: true
    }
  })

  const items = ref([])

  const randomId = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  const getUploadItems = (files: any) => {
    const res = Array.from(files).map(file => ({
      id: randomId(),
      file,
      progress: 0,
      state: states.WAITING,
      response: null
    }))
    return res
  }

  watch(() => props.files, (newFiles: any) => {
    items.value.unshift(...getUploadItems(newFiles) as [])
  } )


</script>


<template>
  <div class="card shadow uploader-popup">
    <div class="card-header bg-dark py-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-center text-white">Uploading</span>
        <div class="popup-controls">
          <button class="rounded-button me-2">
            <icon-chevron-down />
          </button>
          <button class="rounded-button">
            <icon-times />
          </button>
        </div>
      </div>
    </div>
    <div class="upload-items">
      <ul class="list-group list-group-flush" v-if="items.length">
        <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="item in items"
            :key="`item-${item.id}`"
        >
          <p class="upload-item">{{ item.file.name }}</p>
          <div class="upload-controls">x</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .uploader-popup {
    width: 400px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
  }

</style>