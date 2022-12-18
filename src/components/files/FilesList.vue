<script setup lang="ts">
import FileItem from "@/components/files/FileItem.vue";
import {reactive} from "vue";

const props = defineProps({
  files: {
    type: Array,
    required: true
  }
})

const selectedItems = reactive(new Set())

const selectOne = (item: any) => {
  selectedItems.clear()
  selectedItems.add(item)
  emitSelectChange('select-change', selectedItems)
}

const selectMultiple = (item: any) => {
  if (selectedItems.has(item)) {
    selectedItems.delete(item)
  }
  else {
    selectedItems.add(item)
  }
  emitSelectChange('select-change', selectedItems)
}

const clearSelected = () => {
  selectedItems.clear()
  emitSelectChange('select-change', selectedItems)
}

const isSelected = (item: any) => selectedItems.has(item)

const emitSelectChange = defineEmits(['select-change'])



</script>

<template>
  <div class="row" @click="clearSelected">
    <FileItem
        v-for="file in files"
        :file="file"
        :key="+file.id"
        @click.exact.stop="selectOne(file)"
        @click.ctrl.stop="selectMultiple(file)"
        :class="{ 'selected-file': isSelected(file) }"
    />
  </div>
</template>