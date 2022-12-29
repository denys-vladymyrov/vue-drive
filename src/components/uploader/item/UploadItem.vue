<script setup lang="ts">
import {useIconFileType} from "@/composable/icon-file-type"
import IconTypeCommon from "@/components/icons/IconTypeCommon.vue"

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

</script>


<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <p class="upload-item">
      <component :is="useIconFileType(item.file.type)" />
      <span>{{ item.file.name }}</span>
    </p>
    <div class="upload-controls">x</div>
  </li>
</template>

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