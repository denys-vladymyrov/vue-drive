<template>
  <div class="card shadow uploader-popup" v-if="items.length">
    <div class="card-header bg-dark py-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-center text-white">{{ uploadingStatus }}</span>
        <PopupControls @toggle="showPopupBody = !showPopupBody" @close="handleClose" />
      </div>
    </div>
    <div class="upload-items" v-show="showPopupBody">
      <ul class="list-group list-group-flush" v-if="items.length">
        <UploadItem
            v-for="item in items"
            :key="`item-${item.id}`"
            :item="item"
            @change="handleItemChange"
        >
        </UploadItem>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import states from "@/components/uploader/states"
import PopupControls from "@/components/uploader/popup/PopupControls.vue"
import UploadItem from "@/components/uploader/item/UploadItem.vue"
import {computed, ref, watch} from "vue"

  const props = defineProps({
    files: {
      type: Object,
      required: true
    }
  })

  const items = ref([])
  const showPopupBody = ref(true)

  const handleClose = () => {
    if (confirm("Cancel all uploads?")) {
      items.value.splice(0)
    }
  }

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

  const uploadingItemsCount = computed(() => {
    return items.value.filter((item: any) => item.state === states.WAITING || states.UPLOADING).length
  })

  const uploadingStatus = computed(() => {
    return `Uploading ${uploadingItemsCount.value} items`
  })

  const handleItemChange = (item: any) => {
    if (item.state === states.COMPLETE) {
      emit('upload-complete', item.response)
      const index = items.value.findIndex((i: any) => i.id === item.id)
      items.value.splice(index, 1, (item as never))
    }
  }

const emit = defineEmits(['upload-complete'])

  watch(() => props.files, (newFiles: any) => {
    items.value.unshift(...getUploadItems(newFiles) as [])
  } )


</script>
<style scoped>
  .uploader-popup {
    width: 400px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
  }

</style>