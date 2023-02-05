<template>
  <div class="row" @click="clearSelected">
    <FolderItem
        v-for="folder in folders"
        :folder="folder"
        :key="`folder-${folder.id}`"
        @click.exact.stop="selectOne(folder)"
        @click.ctrl.stop="selectMultiple(folder)"
        :class="{ 'selected-folder': isSelected(folder) }"
    />
  </div>
</template>


<script setup lang="ts">
import {reactive} from "vue";
import FolderItem from "@/components/files/FolderItem.vue";

const props = defineProps({
  folders: {
    type: Array,
    required: true
  },
  selected: {
    type: Array,
    default: () => []
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

const isSelected = (item: any) => selectedItems.has(item) || props.selected?.length && props.selected[0].id === item.id

const emitSelectChange = defineEmits(['select-change'])



</script>

