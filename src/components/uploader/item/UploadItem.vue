<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <p :class="uploadItemClasses">
      <component :is="useIconFileType(item.file.type)" />
      <span>{{ item.file.name }}</span>
    </p>
    <span class="failed-text" v-show="isCanceled">Upload canceled</span>
    <UploadControls :item="item" @cancel="handleCancel" @retry="handleRetry" @locate="handleLocate" />
  </li>
</template>


<script setup lang="ts">
import {useIconFileType} from "@/composable/icon-file-type"
import {computed, inject, onMounted, reactive, watch} from "vue"
import filesApi from "../../../api/files"
import states from "@/components/uploader/states"
import UploadControls from "@/components/uploader/item/UploadControls.vue"
import axios from "axios"
import useUploadStates from "@/composable/upload-states"

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const uploadItem = reactive(props.item)
let source = axios.CancelToken.source()

const { isCanceled } = useUploadStates(uploadItem)


const uploadItemClasses = computed(() => {
  return {
    "upload-item": true,
    "failed": isCanceled.value
  }
})

const createFormData = (file: any) => {
  const formData = new FormData()
  formData.append('file', file)
  return formData
}
const startUpload = async (upload: any, source:  any ) => {
  try {
    upload.state = states.UPLOADING
    const { data } = await filesApi.create(createFormData(upload.file), {
      onUploadProgress: (e: any) => {
        if (e.event.lengthComputable) {
          upload.progress = Math.round((e.loaded / e.total) * 100)
        }
      },
      cancelToken: source.token
    })
    upload.state = states.COMPLETE
    upload.response = data
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      upload.state = states.FAILED
    }
    upload.progress = 0
  }
}

watch(() => [uploadItem.progress, uploadItem.state], () => {
  if (uploadItem.state === states.CANCELED) {
    source.cancel()
  }
  else if (uploadItem.state === states.WAITING) {
    handleRetry()
  }
  emit('change', uploadItem)
})

const emit = defineEmits(['change'])


const handleCancel = () => {
  uploadItem.state = states.CANCELED
}

const handleRetry = () => {
  source = axios.CancelToken.source()
  startUpload(uploadItem, source)
}

const setSelectedItem = inject('setSelectedItem')

const handleLocate = () => {
  setSelectedItem([uploadItem.response])
}

onMounted(() => {
  startUpload(uploadItem, source)
})
</script>



<style scoped>
  .upload-item {
    line-height: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  .upload-item,
  .failed-text {
    color: #6c757d;
  }

  .upload-item span,
  .failed-text {
    font-size: 12px;
  }

  .upload-item span {
    margin-left: 6px;
  }

  .failed {
    width: 140px;
    color: #212529;
  }
</style>