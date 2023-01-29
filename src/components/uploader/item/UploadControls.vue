<template>
  <div class="upload-controls" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <template v-if="!hovered">
      <ProgressRing  :progress="item.progress" v-if="isUploading" />
      <div class="upload-action" v-else>
        <div class="action-canceled" v-if="isCanceled"><icon-exclamation /></div>
        <div class="action-complete" v-else-if="isComplete"><icon-check /></div>
      </div>
    </template>
    <template v-else>
      <div class="upload-action">
        <div class="action-cancel" v-if="isUploading"><button @click="emit('cancel')"><icon-times /></button></div>
        <div class="action-canceled" v-else-if="isCanceled"><button @click="emit('retry')"><icon-clockwise /></button></div>
        <div class="action-locate" v-else-if="isComplete"><button @click="emit('locate')"><icon-folder-open /></button></div>
      </div>
    </template>

  </div>
</template>


<script setup lang="ts">
  import ProgressRing from "@/components/uploader/item/ProgressRing.vue"
  import {ref} from "vue"
  import useUploadStates from "@/composable/upload-states"

  const props = defineProps({
    item: {
      type: Object,
      default: 0
    }
  })

  const {isCanceled, isUploading, isComplete} = useUploadStates(props.item)

  const hovered = ref(false)

  console.log("isUploading: " + isUploading)

  const emit = defineEmits(['cancel', 'retry', 'locate'])


</script>

<style scoped lang="scss">
  .upload-controls,
  .upload-action,
  .action-cancel,
  .action-canceled,
  .action-complete,
  .action-locate {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .upload-controls {
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .upload-controls:hover {
    background-color: #d9d9d9;
    fill: white;
  }

  .upload-controls button {
    background: transparent;
    padding: 0;
    border: none;
  }

  .upload-action,
  .upload-controls button {
    width: 32px;
    height: 32px;
  }

  .action-cancel,
  .action-canceled,
  .action-complete,
  .action-locate {
    width: 70%;
    height: 70%;
    border-radius: 50%;
  }

  .action-cancel {
    background-color: #333;
  }

  .action-canceled {
    background-color: #dc3545;
  }

  .action-complete {
    background-color: #28a745;
  }

  .action-locate {
    position: relative;
    background-color: #d9d9d9;
  }

  .upload-action svg {
    width: 70%;
    height: 70%;
    color: #fff;
  }
</style>