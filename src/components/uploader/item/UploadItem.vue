<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <p class="upload-item">
      <component :is="useIconFileType(item.file.type)" />
      <span>{{ item.file.name }}</span>
    </p>
    <UploadControls :item="item" @cancel="handleCancel" />
  </li>
</template>


<script setup lang="ts">
import {useIconFileType} from "@/composable/icon-file-type"
import {onMounted, reactive} from "vue"
import filesApi from "../../../api/files"
import states from "@/components/uploader/states"
import UploadControls from "@/components/uploader/item/UploadControls.vue"
import axios from "axios"

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const uploadItem = reactive(props.item)
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
    upload.state = axios.isCancel(error) ? states.CANCELED : states.FAILED;
    upload.progress = 0
  }
}

const source = axios.CancelToken.source()
const handleCancel = () => {
  source.cancel()
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